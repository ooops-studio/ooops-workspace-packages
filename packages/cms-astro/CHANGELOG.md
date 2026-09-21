# @ooopsstudio/workspace-astro

## 0.3.0

### Minor Changes

- Publish Workspace-branded integration packages and update their API dependency. Existing CMS client exports and HTTP paths remain compatible; older CMS-named packages remain available on npm.

### Patch Changes

- Updated dependencies []:
  - @ooopsstudio/workspace-api@0.4.0

## 0.2.2

### Patch Changes

- Align the Astro and Cloudflare helpers with `@ooopsstudio/workspace-api` 0.3 so
  consumer applications resolve one compatible client and type surface.

## 0.2.1

### Patch Changes

- [#6](https://github.com/ooops-studio/ooops-workspace-packages/pull/6) [`eafa50f`](https://github.com/ooops-studio/ooops-workspace-packages/commit/eafa50fc2ef25990f9abe1f46edd3449a09bfd1f) Thanks [@italiour](https://github.com/italiour)! - Replace the leaked workspace protocol with a registry-compatible CMS API dependency range so npm consumers can install the published adapters.

## 0.2.0

### Minor Changes

- [`fc935e9`](https://github.com/ooops-studio/ooops-workspace-packages/commit/fc935e9d2b81705d2b72938b1f3deee6a422d472) Thanks [@italiour](https://github.com/italiour)! - Add Astro-friendly CMS helpers for env parsing, client setup, sitemap XML, JSON-LD payloads, canonical URLs, and locale paths.

### Patch Changes

- [`0bc2d9a`](https://github.com/ooops-studio/ooops-workspace-packages/commit/0bc2d9a930d7a9d4d9c9b85db292602bbf98ddf5) Thanks [@italiour](https://github.com/italiour)! - Build the workspace CMS API declarations before type-checking the Astro adapter so clean consumers and CI do not depend on stale local artifacts.
- Updated dependencies [[`fc935e9`](https://github.com/ooops-studio/ooops-workspace-packages/commit/fc935e9d2b81705d2b72938b1f3deee6a422d472), [`2849fac`](https://github.com/ooops-studio/ooops-workspace-packages/commit/2849fac7c0342e6dfb590241bfbddab8ec204edf)]:
  - @ooopsstudio/workspace-api@0.2.0
