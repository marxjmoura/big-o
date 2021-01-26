describe('cut()', () => {

  describe('when pass an empty matrix', () => {
    const wall = []

    it('returns count 0', () => {
      expect(algorithm.cut(wall).count).toBe(0)
    })

    it('returns position 0', () => {
      expect(algorithm.cut(wall).position).toBe(0)
    })
  })

  describe('when pass a matrix with empty rows', () => {
    const wall = [
      []
    ]

    it('returns count 0', () => {
      expect(algorithm.cut(wall).count).toBe(0)
    })

    it('returns position 0', () => {
      expect(algorithm.cut(wall).position).toBe(0)
    })
  })

  describe('when passing an array with one element per line', () => {
    const wall = [
      [3],
      [3],
      [3]
    ]

    it('returns the wall.length (hit all the bricks)', () => {
      expect(algorithm.cut(wall).count).toBe(3)
    })

    it('returns the middle position of the wall', () => {
      expect(algorithm.cut(wall).position).toBe(1.5)
    })
  })

  describe('when pass a full matrix', () => {
    const wall = [
      [1, 2, 2, 1],
      [3, 1, 2],
      [1, 3, 2],
      [2, 4],
      [3, 1, 2],
      [1, 3, 1, 1]
    ]

    it('returns the fewest number of bricks', () => {
      expect(algorithm.cut(wall).count).toBe(2)
    })

    it('returns the best position (cuts the most spaces)', () => {
      expect(algorithm.cut(wall).position).toBe(4)
    })
  })

})
