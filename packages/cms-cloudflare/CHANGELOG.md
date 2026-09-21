# @ooopsstudio/workspace-cloudflare

## 0.4.0

### Minor Changes

- Publish Workspace-branded integration packages and update their API dependency. Existing CMS client exports and HTTP paths remain compatible; older CMS-named packages remain available on npm.

### Patch Changes

- Updated dependencies []:
  - @ooopsstudio/workspace-api@0.4.0

## 0.3.2

### Patch Changes

- Align the Astro and Cloudflare helpers with `@ooopsstudio/workspace-api` 0.3 so
  consumer applications resolve one compatible client and type surface.

## 0.3.1

### Patch Changes

- [#10](https://github.com/ooops-studio/ooops-workspace-packages/pull/10) [`d4b1ad7`](https://github.com/ooops-studio/ooops-workspace-packages/commit/d4b1ad70eff98eb857862927bfa81eb619820205) Thanks [@italiour](https://github.com/italiour)! - Keep completed CMS rebuild events idempotent for seven days while retaining a short recoverable processing lease, and document the full replay-store contract.

## 0.3.0

### Minor Changes

- [#8](https://github.com/ooops-studio/ooops-workspace-packages/pull/8) [`52524af`](https://github.com/ooops-studio/ooops-workspace-packages/commit/52524af9a7c81378427d68735d77f52f0be90474) Thanks [@italiour](https://github.com/italiour)! - Add the signed Ooops Workspace rebuild event contract, durable replay claims, standardized handler responses, and a restricted Cloudflare Workers Deploy Hook client for SSG rebuilds.

## 0.2.1

### Patch Changes

- [#6](https://github.com/ooops-studio/ooops-workspace-packages/pull/6) [`eafa50f`](https://github.com/ooops-studio/ooops-workspace-packages/commit/eafa50fc2ef25990f9abe1f46edd3449a09bfd1f) Thanks [@italiour](https://github.com/italiour)! - Replace the leaked workspace protocol with a registry-compatible CMS API dependency range so npm consumers can install the published adapters.

## 0.2.0

### Minor Changes

- [`fc935e9`](https://github.com/ooops-studio/ooops-workspace-packages/commit/fc935e9d2b81705d2b72938b1f3deee6a422d472) Thanks [@italiour](https://github.com/italiour)! - Add Cloudflare-friendly helpers for the deployed CMS preview contract, including server-side token validation, encrypted sessions, scoped cookies, and private response headers.

### Patch Changes

- Updated dependencies [[`fc935e9`](https://github.com/ooops-studio/ooops-workspace-packages/commit/fc935e9d2b81705d2b72938b1f3deee6a422d472), [`2849fac`](https://github.com/ooops-studio/ooops-workspace-packages/commit/2849fac7c0342e6dfb590241bfbddab8ec204edf)]:
  - @ooopsstudio/workspace-api@0.2.0
