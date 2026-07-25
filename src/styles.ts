/**
 * Self-contained styles for cfg-react components — injected ONCE into <head> the first time a
 * component mounts. No Tailwind, no CSS build step on the consumer, so the look is identical whether
 * the component renders inside PlayTable (Next.js) or a DOM node in the FoundryVTT plugin overlay.
 * Dark, translucent, canvas-overlay styling (these panels sit over a 3D scene).
 */
const STYLE_ID = 'cfg-react-styles'

const CSS = `
/* Geometry matches a Foundry scene-controls tool column (32px buttons, 8px gap, 4px radius) so the
   rail reads as one continuous column when hosted there; the color identity stays ours. */
.cfgr-rail { display:flex; flex-direction:column; align-items:center; gap:8px; }
/* pointer-events:all mirrors Foundry's own .ui-control buttons: when the rail is hosted inside
   Foundry's scene-controls, the aside/menu/li are pointer-events:none (its "faded UI"), so a button
   must opt back IN or it can never be clicked. Harmless on surfaces that don't do that (PlayTable). */
.cfgr-btn { pointer-events:all; position:relative; width:32px; height:32px; display:inline-flex; align-items:center; justify-content:center;
  border:1px solid rgba(255,255,255,0.22); border-radius:4px; background:rgba(0,0,0,0.6); color:rgba(255,255,255,0.85);
  cursor:pointer; -webkit-backdrop-filter:blur(4px); backdrop-filter:blur(4px); padding:0;
  transition:border-color .12s, background .12s, color .12s, box-shadow .12s; }
.cfgr-btn:hover { border-color:rgba(255,255,255,0.55); color:#fff; background:rgba(0,0,0,0.7); }
.cfgr-btn:focus-visible { outline:2px solid #7dd3fc; outline-offset:1px; }
.cfgr-btn.cfgr-active { border-color:rgba(125,211,252,0.8); color:#e0f2fe; background:rgba(8,47,73,0.65);
  box-shadow:0 0 0 1px rgba(125,211,252,0.5), 0 0 10px rgba(56,189,248,0.35); }
.cfgr-btn svg { width:19px; height:19px; display:block; }
.cfgr-label { position:absolute; top:50%; transform:translateY(-50%); white-space:nowrap; z-index:30;
  background:rgba(0,0,0,0.85); color:#fff; font-size:12px; font-weight:500; line-height:1; padding:5px 8px; border-radius:4px;
  box-shadow:0 2px 8px rgba(0,0,0,0.45); opacity:0; pointer-events:none; -webkit-backdrop-filter:blur(4px); backdrop-filter:blur(4px);
  transition:opacity .1s; }
.cfgr-label-left { right:100%; margin-right:8px; }
.cfgr-label-right { left:100%; margin-left:8px; }
.cfgr-btn:hover .cfgr-label, .cfgr-btn:focus-visible .cfgr-label { opacity:1; }
.cfgr-pill { pointer-events:none; display:inline-flex; align-items:center; gap:4px; white-space:nowrap;
  background:rgba(0,0,0,0.6); border:1px solid rgba(125,211,252,0.4); color:#e0f2fe;
  font-size:12px; font-weight:500; line-height:1; padding:4px 10px; border-radius:999px;
  -webkit-backdrop-filter:blur(4px); backdrop-filter:blur(4px); }
/* PLACED (imprinted) reads amber, matching the placed reticle; ethereal/held stays cyan. */
.cfgr-pill-placed { border-color:rgba(252,211,77,0.45); color:#fde68a; }
.cfgr-sep { width:20px; height:1px; background:rgba(255,255,255,0.15); margin:2px 0; }
/* Camera-mode bar (bottom of a 3D surface). pointer-events:all for the same faded-UI reason as .cfgr-btn. */
.cfgr-switcher { display:inline-flex; align-items:stretch; overflow:hidden; border:1px solid rgba(255,255,255,0.25);
  border-radius:6px; background:rgba(0,0,0,0.6); -webkit-backdrop-filter:blur(4px); backdrop-filter:blur(4px); }
.cfgr-switch-btn { pointer-events:all; appearance:none; border:0; background:transparent; cursor:pointer;
  color:rgba(255,255,255,0.72); font-size:12px; font-weight:500; line-height:1; padding:7px 10px; white-space:nowrap;
  transition:background .12s, color .12s; }
.cfgr-switch-btn + .cfgr-switch-btn { border-left:1px solid rgba(255,255,255,0.15); }
.cfgr-switch-btn:hover { background:rgba(255,255,255,0.1); color:#fff; }
.cfgr-switch-btn:focus-visible { outline:2px solid #7dd3fc; outline-offset:-2px; }
.cfgr-switch-active { background:rgba(255,255,255,0.2); color:#fff; }
`

/** Inject the cfg-react stylesheet once. Safe to call on every mount + in non-DOM (SSR) contexts. */
export function ensureStyles(): void {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const el = document.createElement('style')
  el.id = STYLE_ID
  el.textContent = CSS
  document.head.appendChild(el)
}
