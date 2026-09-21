# Workspace SDK migration

The repository is now `ooops-studio/ooops-workspace-packages`.

| Previous package | Replacement release |
| --- | --- |
| `@ooopsstudio/cms-api` | `@ooopsstudio/workspace-api@0.4.0` |
| `@ooopsstudio/cms-astro` | `@ooopsstudio/workspace-astro@0.3.0` |
| `@ooopsstudio/cms-cloudflare` | `@ooopsstudio/workspace-cloudflare@0.4.0` |

Update imports and dependency names together, then regenerate the consumer lockfile. The new names require an npm publication before registry-only consumers can install them. Repository push alone does not publish packages.

Existing CMS-named npm releases remain available. Client factories, exported CMS-prefixed symbols, environment variable names and `/api/cms/v1` paths are preserved. Changing the product name does not require an HTTP path migration or a new credential. Do not switch a production API hostname until its authorization and endpoint coverage have been verified.

The single response type now reflects the current `{ ok: true, data }` envelope. `CmsLegacySingleResponse` describes the older `{ ok: true, content }` envelope. Runtime clients preserve wire responses; consumers supporting mixed server releases must inspect the envelope explicitly.

Local integration builds resolve sibling packages in this repository. Published packages retain ordinary version ranges; release builds must verify packed artifacts. Local source directory names remain unchanged to preserve existing development checkouts.
