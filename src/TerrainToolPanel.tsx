/**
 * TerrainToolPanel — the shared terrain sculpting tool rail. PURE UI: it renders the tools + toggles
 * + an elevation readout and calls back; the HOST owns the heightfield state and wires the shared,
 * framework-free stamp/sculpt logic (from @crit-fumble/shared). Used by PlayTable directly and mounted
 * into the FoundryVTT plugin's 3D overlay via createRoot. One component ⇒ one look on both surfaces.
 */
import { useEffect } from 'react'
import { ensureStyles } from './styles.js'
import { RailButton } from './RailButton.js'
import { AddTerrainIcon, StampIcon, RaiseIcon, LowerIcon, LevelIcon, SmoothIcon, ShapeCircleIcon, ShapeSquareIcon, GridIcon, HalfIcon } from './icons.js'

export type TerrainTool = 'stamp' | 'raise' | 'lower' | 'level' | 'smooth'

export interface TerrainToolPanelProps {
  /** The armed tool, or null when none is active. */
  tool: TerrainTool | null
  onSelectTool: (t: TerrainTool) => void
  /** False → the scene has no heightfield yet; the panel offers "Add 3D terrain" instead of the tools. */
  hasTerrain: boolean
  onAddTerrain?: () => void
  shape: 'circle' | 'square'
  onSetShape: (s: 'circle' | 'square') => void
  snap: boolean
  onToggleSnap: () => void
  snapHalf: boolean
  onToggleSnapHalf: () => void
  /** Live brush/stamp elevation in game units (feet), or null/undefined to hide the readout. */
  elevation?: number | null
  unitLabel?: string
  /** Which screen edge the rail hugs (labels open inward). Default 'left' (left-edge rail). */
  labelSide?: 'left' | 'right'
}

export function TerrainToolPanel({
  tool,
  onSelectTool,
  hasTerrain,
  onAddTerrain,
  shape,
  onSetShape,
  snap,
  onToggleSnap,
  snapHalf,
  onToggleSnapHalf,
  elevation,
  unitLabel = 'ft',
  labelSide = 'right',
}: TerrainToolPanelProps) {
  useEffect(ensureStyles, [])

  if (!hasTerrain) {
    return (
      <div className="cfgr-rail" data-testid="cfgr-terrain-panel">
        <RailButton
          icon={<AddTerrainIcon />}
          label="Add 3D terrain — creates a flat heightfield you can sculpt"
          onClick={() => onAddTerrain?.()}
          testId="cfgr-terrain-add"
          labelSide={labelSide}
        />
      </div>
    )
  }

  return (
    <div className="cfgr-rail" data-testid="cfgr-terrain-panel">
      <RailButton icon={<StampIcon />} label="Level Stamp — WASD move · Q/E height · sets tiles to an exact elevation" active={tool === 'stamp'} onClick={() => onSelectTool('stamp')} testId="cfgr-tool-stamp" labelSide={labelSide} />
      <RailButton icon={<RaiseIcon />} label="Raise terrain" active={tool === 'raise'} onClick={() => onSelectTool('raise')} testId="cfgr-tool-raise" labelSide={labelSide} />
      <RailButton icon={<LowerIcon />} label="Lower terrain" active={tool === 'lower'} onClick={() => onSelectTool('lower')} testId="cfgr-tool-lower" labelSide={labelSide} />
      <RailButton icon={<LevelIcon />} label="Level / flatten" active={tool === 'level'} onClick={() => onSelectTool('level')} testId="cfgr-tool-level" labelSide={labelSide} />
      <RailButton icon={<SmoothIcon />} label="Smooth" active={tool === 'smooth'} onClick={() => onSelectTool('smooth')} testId="cfgr-tool-smooth" labelSide={labelSide} />
      <div className="cfgr-sep" />
      <RailButton
        icon={shape === 'square' ? <ShapeSquareIcon /> : <ShapeCircleIcon />}
        label={`Brush shape — ${shape} (click to toggle)`}
        pressed={shape === 'square'}
        onClick={() => onSetShape(shape === 'square' ? 'circle' : 'square')}
        testId="cfgr-tool-shape"
        labelSide={labelSide}
      />
      <RailButton icon={<GridIcon />} label="Grid-lock: snap to tiles + step whole grid-units" active={snap} pressed={snap} onClick={onToggleSnap} testId="cfgr-tool-snap" labelSide={labelSide} />
      {snap && (
        <RailButton icon={<HalfIcon />} label="Grid-lock step: HALF a grid-unit" active={snapHalf} pressed={snapHalf} onClick={onToggleSnapHalf} testId="cfgr-tool-snaphalf" labelSide={labelSide} />
      )}
      {elevation != null && (
        <div className="cfgr-pill" data-testid="cfgr-terrain-elevation">
          {elevation >= 0 ? '+' : ''}
          {Math.round(elevation * 10) / 10} {unitLabel}
        </div>
      )}
    </div>
  )
}
