import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { SeatSlider } from '../../src/SeatSlider.js'

afterEach(cleanup)

const range = () => screen.getByRole('slider') as HTMLInputElement

describe('SeatSlider', () => {
  it('keeps the GM quarter out of a player\u2019s reach', () => {
    render(<SeatSlider gmSeat={false} seatAz={0} onSeatChange={() => {}} />)
    // ±135° around the south home — a 270° arc, so ±π (north) is unreachable.
    expect(parseFloat(range().min)).toBeCloseTo(-(Math.PI - Math.PI / 4), 5)
    expect(parseFloat(range().max)).toBeCloseTo(Math.PI - Math.PI / 4, 5)
  })

  it('gives the GM seat the full circle', () => {
    render(<SeatSlider gmSeat seatAz={Math.PI} onSeatChange={() => {}} />)
    expect(parseFloat(range().min)).toBeCloseTo(-Math.PI, 5)
    expect(parseFloat(range().max)).toBeCloseTo(Math.PI, 5)
  })

  it('centres the handle on each seat\u2019s home', () => {
    const { unmount } = render(<SeatSlider gmSeat={false} seatAz={0} onSeatChange={() => {}} />)
    expect(parseFloat(range().value)).toBeCloseTo(0, 5)
    unmount()

    render(<SeatSlider gmSeat seatAz={Math.PI} onSeatChange={() => {}} />)
    expect(parseFloat(range().value)).toBeCloseTo(0, 5)
  })

  it('wraps the handle when a live orbit crosses ±π', () => {
    // Raw offset from the GM's north home is -6.14 rad; unwrapped it would slam the handle to the
    // far end instead of sitting just past home.
    render(<SeatSlider gmSeat seatAz={-3} onSeatChange={() => {}} />)
    expect(parseFloat(range().value)).toBeCloseTo(2 * Math.PI - 3 - Math.PI, 5)
  })

  it('reports an azimuth already wrapped into [-π, π]', () => {
    const onSeatChange = jest.fn()
    render(<SeatSlider gmSeat seatAz={Math.PI} onSeatChange={onSeatChange} />)
    fireEvent.change(range(), { target: { value: '3' } })
    // home (π) + 3 = 6.14, which must come back as -0.14 rather than overshooting the circle.
    expect(onSeatChange).toHaveBeenCalledTimes(1)
    expect(onSeatChange.mock.calls[0][0]).toBeCloseTo(Math.PI + 3 - 2 * Math.PI, 5)
  })
})
