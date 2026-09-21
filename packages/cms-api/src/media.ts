/** A public catalog file, with text resolved for this content usage and language. */
export type WorkspaceMediaFile = Record<string, unknown> & {
	assetId: string;
	alt: string | null;
	caption: string | null;
}
type RecordValue = Record<string, unknown>
const record = (value: unknown): RecordValue => value && typeof value === 'object' && !Array.isArray(value) ? value as RecordValue : {}
const own = (value: RecordValue, key: string) => Object.hasOwn(value, key)
const text = (value: unknown, locale: string): string | null => {
	const localized = record(value)[locale]
	return typeof value === 'string' ? value : typeof localized === 'string' ? localized : null
}

/**
 * Resolve a public content media field using the API's per-language projection.
 * Paths use stable repeater row IDs, not visual positions. Null/empty galleries
 * intentionally hide media; missing/private files never fall back to another file.
 * This helper is pure and never fetches files or uses an API credential.
 */
export function resolveWorkspaceContentMedia(
	content: unknown,
	fieldPath: string,
	locale: string
): WorkspaceMediaFile | WorkspaceMediaFile[] | null | undefined {
	const entry = record(content)
	const parts = fieldPath.split('.')
	if (!fieldPath || parts.some((key) => ['__proto__', 'prototype', 'constructor'].includes(key))) return undefined
	const usages = record(record(entry._mediaUsages)[fieldPath])
	const projected = own(usages, locale)
	let value: unknown = usages[locale]
	if (!projected) {
		const snapshot = record(entry.snapshot ?? entry.data ?? entry)
		value = snapshot.fields ?? snapshot.input ?? snapshot
		for (const key of parts) {
			if (Array.isArray(value)) {
				value = value.find((item) => record(item).id === key) ?? (/^(0|[1-9][0-9]*)$/.test(key) ? value[Number(key)] : undefined)
				continue
			}
			let container = record(value)
			if (!own(container, key) && own(container, locale)) container = record(container[locale])
			if (own(container, 'values') && own(container, 'localized') && own(container, 'id')) {
				const localized = record(record(container.localized)[locale])
				value = own(localized, key) ? localized[key] : record(container.values)[key]
			} else value = own(container, key) ? container[key] : undefined
		}
		if (value && typeof value === 'object' && !Array.isArray(value) && !own(record(value), 'assetId')) value = record(value)[locale]
	}
	if (value === undefined || value === null) return value
	const catalog = record(entry._media)
	const resolveFile = (reference: unknown): WorkspaceMediaFile | null => {
		const ref = record(reference)
		const id = typeof reference === 'string' ? reference : ref.assetId
		if (typeof id !== 'string' || !own(catalog, id)) return null
		const file = record(catalog[id])
		return {...file, assetId: id,
			alt: projected && own(ref, 'alt') ? text(ref.alt, locale) : text(file.alt, locale),
			caption: projected && own(ref, 'caption') ? text(ref.caption, locale) : text(file.caption, locale)}
	}
	if (!Array.isArray(value)) return resolveFile(value)
	return value.map(resolveFile).filter((file): file is WorkspaceMediaFile => file !== null)
}
