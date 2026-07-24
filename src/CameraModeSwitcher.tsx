/**
 * CameraModeSwitcher — the horizontal camera-mode bar shown at the bottom of a 3D play surface
 * (PlayTable centres it under the scene; the FoundryVTT plugin sits it above the hotbar while the 3D
 * overlay is up). Pure UI: the caller passes the modes THIS viewer is allowed to use, so a player sees
 * only their views and a GM sees all of them.
 */
import { useEffect } from 'react'
import { ensureStyles } from './styles.js'

export interface CameraModeOption {
  /** Stable id handed back to onSelect (e.g. '2d' | 'topdown' | 'tabletop' | 'tabletop-gm' | 'free' | 'character'). */
  key: string
  label: string
  /** Optional hover/aria detail. */
  title?: string
}

export interface CameraModeSwitcherProps {
  modes: CameraModeOption[]
  /** The active mode key, or null when none is active. */
  active: string | null
  onSelect: (key: string) => void
}

export function CameraModeSwitcher({ modes, active, onSelect }: CameraModeSwitcherProps) {
  useEffect(ensureStyles, [])
  if (!modes.length) return null
  return (
    <div className="cfgr-switcher" role="group" aria-label="Camera view" data-testid="cfgr-camera-switcher">
      {modes.map((m) => (
        <button
          key={m.key}
          type="button"
          className={active === m.key ? 'cfgr-switch-btn cfgr-switch-active' : 'cfgr-switch-btn'}
          onClick={() => onSelect(m.key)}
          aria-pressed={active === m.key}
          title={m.title || m.label}
          data-testid={`cfgr-camera-${m.key}`}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
