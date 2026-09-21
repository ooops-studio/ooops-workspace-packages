import {describe, expect, it} from 'vitest'

import {resolveWorkspaceContentMedia} from './index.js'
const _media = {
	shared: {publicUrl: 'https://assets.example.test/shared.png', alt: {en: 'Shared'}},
	translated: {publicUrl: 'https://assets.example.test/translated.png', alt: {en: 'File default'}}
}
describe('public localized content media', () => {
	it('uses usage-specific file and explicit empty alt without mutating content', () => {
		const entry = {data: {cover: 'shared'}, _media, _mediaUsages: {cover: {en: {assetId: 'translated', alt: '', caption: 'Caption'}, el: null}}}
		expect(resolveWorkspaceContentMedia(entry, 'cover', 'en')).toMatchObject({assetId: 'translated', alt: '', caption: 'Caption'})
		expect(resolveWorkspaceContentMedia(entry, 'cover', 'el')).toBeNull()
		expect(resolveWorkspaceContentMedia(entry, 'cover', 'fr')).toMatchObject({assetId: 'shared'})
		expect(entry.data.cover).toBe('shared')
	})
	it('preserves gallery ordering and explicit empty galleries, excluding unavailable files', () => {
		const entry = {_media, _mediaUsages: {gallery: {en: [{assetId: 'translated'}, {assetId: 'private'}, {assetId: 'shared'}], el: []}}}
		expect(resolveWorkspaceContentMedia(entry, 'gallery', 'en')).toEqual([
			expect.objectContaining({assetId: 'translated'}), expect.objectContaining({assetId: 'shared'})
		])
		expect(resolveWorkspaceContentMedia(entry, 'gallery', 'el')).toEqual([])
	})
	it('resolves native localized groups and stable repeater rows while respecting null', () => {
		const row = {id: 'row-1', values: {image: 'shared'}, localized: {en: {image: 'translated'}, el: {image: null}}}
		for (const rows of [[row, {id: 'row-2'}], [{id: 'row-2'}, row]]) {
			const entry = {data: {panel: {en: {rows}, el: {rows}}}, _media}
			expect(resolveWorkspaceContentMedia(entry, 'panel.rows.row-1.image', 'en')).toMatchObject({assetId: 'translated'})
			expect(resolveWorkspaceContentMedia(entry, 'panel.rows.row-1.image', 'el')).toBeNull()
		}
	})
	it('never uses unavailable overrides, inherited properties or unsafe paths', () => {
		const entry = {data: {cover: 'shared'}, _media, _mediaUsages: {cover: {en: {assetId: 'private'}}}}
		expect(resolveWorkspaceContentMedia(entry, 'cover', 'en')).toBeNull()
		expect(resolveWorkspaceContentMedia(entry, '__proto__.cover', 'en')).toBeUndefined()
		expect(resolveWorkspaceContentMedia(entry, 'missing', 'en')).toBeUndefined()
	})
})
