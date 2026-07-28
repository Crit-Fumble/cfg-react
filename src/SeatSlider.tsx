/**
 * SeatSlider — your position around the 3D table, shown with the camera bar on both surfaces
 * (PlayTable's stage chrome and the FoundryVTT plugin's above-hotbar dock). Pure UI over the shared
 * seat model (@crit-fumble/threejs controls): the value is an OFFSET from the seat's HOME, so the
 * handle starts centred — players get ±135° around their south home (the GM's quarter stays out of
 * reach), the GM seat gets ±180° around north. The host owns the camera; this just reports azimuths.
 */
import { useEffect } from 'react'
import { ensureStyles } from './styles.js'

export interface SeatSliderProps {
  /** GM seat: home is north with the full circle; players get a 270° arc around south. */
  gmSeat: boolean
  /** Current seat azimuth (radians; 0 = Party/south home, ±π = GM/north). */
  seatAz: number
  onSeatChange: (azimuthRad: number) => void
  /** Pill label (default 'Seat'). */
  label?: string
  /** data-testid for the pill (default 'cfgr-seat-slider'). PlayTable passes its established id. */
  testId?: string
}

export function SeatSlider({ gmSeat, seatAz, onSeatChange, label = 'Seat', testId = 'cfgr-seat-slider' }: SeatSliderProps) {
  useEffect(ensureStyles, [])
  const half = gmSeat ? Math.PI : Math.PI - Math.PI / 4
  const home = gmSeat ? Math.PI : 0
  // Wrap the offset-from-home into [-π, π] so the handle tracks a live orbit without jumps.
  const value = Math.atan2(Math.sin(seatAz - home), Math.cos(seatAz - home))
  return (
    <div className="cfgr-seat" data-testid={testId}>
      <span className="cfgr-seat-label">{label}</span>
      <input
        type="range"
        min={-half}
        max={half}
        step={0.02}
        value={value}
        onChange={(e) => {
          const off = parseFloat(e.currentTarget.value)
          onSeatChange(Math.atan2(Math.sin(home + off), Math.cos(home + off))) // wrap to [-π,π]
        }}
        aria-label="Seat position around the table"
      />
    </div>
  )
}
