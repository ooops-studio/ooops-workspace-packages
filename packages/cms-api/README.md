# @ooopsstudio/workspace-api

Typed TypeScript client for Ooops Workspace REST API v1.

## Installation

```bash
pnpm add @ooopsstudio/workspace-api
```

The package is ESM-only and supports Node.js 22.14 or newer.

```ts
import { createCmsClient } from '@ooopsstudio/workspace-api';

const cms = createCmsClient({
  baseUrl: 'https://cms.example.com/api/cms/v1',
  token: process.env.OOOPS_CMS_API_TOKEN!
});

const posts = await cms.content.listCollectionEntries('posts', { limit: 20 });
const media = await cms.media.list({ kind: 'images' });
```

Use API tokens only in server-side integrations. The authenticated read client mirrors the CMS v1 read contract and intentionally exposes no generic arbitrary-method transport.

## Draft writer

Draft editor tokens are field-scoped and server-side only. Create them in CMS Settings → Integrations, store them in a protected server or edge environment variable, and use the separate writer factory:

```ts
import { createCmsDraftWriter } from '@ooopsstudio/workspace-api';

const writer = createCmsDraftWriter({
  baseUrl: 'https://cms.example.com/api/cms/v1',
  token: process.env.OOOPS_CMS_DRAFT_TOKEN!
});

const current = await writer.drafts.getSingle('homepage');
const updated = await writer.drafts.patchSingle(
  'homepage',
  [{ op: 'field.set', field: 'headline', locale: 'en', value: 'New headline' }],
  current.revision
);
```

Every patch requires the latest revision and is atomic. The writer can update existing drafts only; it cannot create, publish, archive, or delete entries. Repeatable groups use stable row IDs through `repeatable.add`, `repeatable.patch`, `repeatable.remove`, and `repeatable.move` operations.

## Public forms and previews

Public forms use the tokenless `/api/cms/public` endpoint. The client accepts either the CMS origin or the v1 API base URL:

```ts
import { createCmsPublicFormsClient } from '@ooopsstudio/workspace-api';

const publicForms = createCmsPublicFormsClient({ baseUrl: 'https://cms.example.com' });
await publicForms.forms.submit(process.env.CMS_FORM_SHARE_TOKEN!, {
  answers: { email: 'hello@example.com' }
});
```

Draft previews require both a scoped CMS API token and the short-lived preview token:

```ts
import { createCmsPreviewClient } from '@ooopsstudio/workspace-api';

const preview = createCmsPreviewClient({
  baseUrl: 'https://cms.example.com/api/cms/v1',
  token: process.env.CMS_API_TOKEN!,
  previewToken: process.env.CMS_PREVIEW_TOKEN!
});

const homepage = await preview.content.getSingle('homepage');
```

The OpenAPI contract is served at:

```txt
GET /api/cms/v1/openapi.json
```

## License

MIT

### Single response compatibility

`CmsSingleResponse<T>` describes the current `{ ok: true, data: T }` wire response. For older CMS versions use `CmsLegacySingleResponse<T>` (`content`) explicitly, or a union during a rolling upgrade. Readers do not silently rewrite server payloads. This type correction is queued for the next minor release; existing 0.3.x consumers may retain their explicit data/content union until upgrading.
