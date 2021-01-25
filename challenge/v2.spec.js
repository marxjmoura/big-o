describe("challenge.v2.cut()", () => {
  const versions = ['v1', 'v2']

  const wall = [
    [1, 2, 2, 1],
    [3, 1, 2],
    [1, 3, 2],
    [2, 4],
    [3, 1, 2],
    [1, 3, 1, 1]
  ]

  versions.forEach(version => {
    it("returns the fewest number of bricks", () => {
      expect(challenge[version].cut(wall).count).toBe(2)
    })

    it("returns the best position", () => {
      expect(challenge[version].cut(wall).position).toBe(4)
    })
  })

})
