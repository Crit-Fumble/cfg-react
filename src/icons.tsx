/**
 * Inline SVG icons for the terrain tools — self-contained (no icon-library dependency) so the panel
 * renders identically on any surface. 24×24, stroke=currentColor (inherits the button's color).
 */
import type { ReactNode } from 'react'

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

// Level Stamp — a reticle: circle with axis ticks (matches PlayTable's stamp glyph).
export const StampIcon = () => (
  <Svg>
    <circle cx="12" cy="12" r="6" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </Svg>
)
export const RaiseIcon = () => <Svg><path d="M12 19V5M5 12l7-7 7 7" /></Svg>
export const LowerIcon = () => <Svg><path d="M12 5v14M5 12l7 7 7-7" /></Svg>
export const LevelIcon = () => <Svg><path d="M5 12h14" /></Svg>
// Smooth — a gentle wave.
export const SmoothIcon = () => <Svg><path d="M3 13c3-5 6 5 9 0s6-5 9 0" /></Svg>
// Add 3D terrain — a mountain with a small plus.
export const AddTerrainIcon = () => (
  <Svg>
    <path d="M3 20l5-8 4 5 3-4 6 7z" />
    <path d="M18 3v4M16 5h4" />
  </Svg>
)
export const ShapeCircleIcon = () => <Svg><circle cx="12" cy="12" r="8" /></Svg>
export const ShapeSquareIcon = () => <Svg><rect x="5" y="5" width="14" height="14" rx="1" /></Svg>
// Grid-lock — a grid.
export const GridIcon = () => (
  <Svg>
    <rect x="4" y="4" width="16" height="16" rx="1" />
    <path d="M4 10h16M4 14h16M10 4v16M14 4v16" />
  </Svg>
)
// Half-step — stairs.
export const HalfIcon = () => <Svg><path d="M3 20h4v-4h4v-4h4v-4h4" /></Svg>
