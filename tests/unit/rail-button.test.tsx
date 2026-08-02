import { render, screen, cleanup } from '@testing-library/react'
import { RailButton } from '../../src/RailButton.js'

afterEach(cleanup)

describe('RailButton', () => {
  it('keeps the selected glow independent of aria-pressed', () => {
    render(<RailButton icon={<svg />} label="Terrain" active pressed={false} onClick={() => {}} testId="t" />)
    const btn = screen.getByTestId('t')
    expect(btn.className).toContain('cfgr-active')
    expect(btn).toHaveAttribute('aria-pressed', 'false')
  })

  it('falls back to the glow when pressed is omitted', () => {
    render(<RailButton icon={<svg />} label="Terrain" active onClick={() => {}} testId="t" />)
    expect(screen.getByTestId('t')).toHaveAttribute('aria-pressed', 'true')
  })

  it('opens the label away from the edge the rail hugs', () => {
    const { rerender } = render(<RailButton icon={<svg />} label="Terrain" onClick={() => {}} testId="t" />)
    expect(screen.getByRole('tooltip').className).toContain('cfgr-label-right')

    rerender(<RailButton icon={<svg />} label="Terrain" labelSide="left" onClick={() => {}} testId="t" />)
    expect(screen.getByRole('tooltip').className).toContain('cfgr-label-left')
  })

  it('injects the stylesheet exactly once across separate mounts', () => {
    render(<RailButton icon={<svg />} label="A" onClick={() => {}} />)
    render(<RailButton icon={<svg />} label="B" onClick={() => {}} />)
    expect(document.head.querySelectorAll('#cfg-react-styles')).toHaveLength(1)
  })
})
