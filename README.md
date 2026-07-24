# @crit-fumble/react

Light, **self-styled** React components shared across surfaces:

- **PlayTable** (`cfg-core-browser`, Next.js) — imports components directly.
- **JS-only surfaces** (the FoundryVTT plugin, `cfg-foundry-plugin`) — bundles React + this package with esbuild and mounts a component into a DOM node with `createRoot`, unmounting on teardown.

## Charter

This package is the **"there's got to be a better way"** escape hatch for **sufficiently complex** shared UI — components whose plain-DOM re-implementation on a JS-only surface would be painful to build and keep in sync (e.g. the terrain tool panel: many tools, toggles, a popup, an elevation readout). **Simple UI stays plain-DOM** on each surface; we migrate into this package **selectively**, only when the complexity earns it. Over time, complex UI that today lives hand-rolled on each surface migrates here.

## Rules that keep the plugin bundle sane

- **Pure UI.** Components take props + callbacks. They do **not** import `three` or `@crit-fumble/shared` at runtime — the host wires behaviour (the shared, framework-free stamp/sculpt logic lives in `@crit-fumble/shared`). This keeps the React bundle small and avoids a second copy of `three`/shared inside the plugin.
- **React is a peer dependency.** The consumer provides exactly one React instance (Next in PlayTable; a bundled React in the plugin). Never two.
- **Self-contained styles.** Components auto-inject their own `<style>` once (no Tailwind, no CSS build step on the consumer) so the look is identical on every surface.
- **Lifecycle-bound mounting** on JS surfaces: create the React root when the surface opens, unmount when it closes — no leaked roots.
