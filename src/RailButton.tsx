/**
 * RailButton — one icon button in a canvas control rail (32px square, translucent, selected glow, a
 * hover/focus label that opens inward toward the canvas). Presentational: the caller owns state +
 * behaviour. Mirrors PlayTable's RailButton look without depending on its Tailwind/IconButton.
 */
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { ensureStyles } from './styles.js'

export interface RailButtonProps {
  icon: ReactNode
  label: string
  /** Selected-tool GLOW. Use only for a real selection (a tool / open panel), not a plain toggle. */
  active?: boolean
  /** aria-pressed (toggle state), decoupled from the glow. Defaults to `active`. */
  pressed?: boolean
  onClick: () => void
  testId?: string
  /** Which edge the rail hugs — the label opens the OTHER way (inward, toward the canvas). */
  labelSide?: 'left' | 'right'
}

export function RailButton({ icon, label, active = false, pressed, onClick, testId, labelSide = 'right' }: RailButtonProps) {
  useEffect(ensureStyles, [])
  return (
    <button
      type="button"
      className={active ? 'cfgr-btn cfgr-active' : 'cfgr-btn'}
      onClick={onClick}
      data-testid={testId}
      aria-pressed={pressed ?? active}
      aria-label={label}
      title={label}
    >
      {icon}
      <span className={`cfgr-label cfgr-label-${labelSide}`} role="tooltip">
        {label}
      </span>
    </button>
  )
}
