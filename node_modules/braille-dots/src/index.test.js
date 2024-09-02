import braille from '.'

const blank = '⠀'

describe('braille', () => {
  it('should translate from dots', () => {
    expect(braille('⠎')).toBe(234)
  })

  it('should translate from numbers', () => {
    expect(braille(234)).toBe('⠎')
  })

  it('should translate from numbers even in a silly order', () => {
    expect(braille(342)).toBe('⠎')
  })

  describe('blank', () => {
    it('should translate "blank" to null', () => {
      expect(braille(blank)).toBe(null)
    })

    it('should translate anything falsy to "blank"', () => {
      expect(braille()).toBe(blank)
      expect(braille(null)).toBe(blank)
      expect(braille('')).toBe(blank)
      expect(braille(0)).toBe(blank)
      expect(braille(false)).toBe(blank)
    })
  })
})
