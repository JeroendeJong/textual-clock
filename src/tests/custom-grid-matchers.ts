

export function toBeAfterValueInGrid<T>(expected: T, actual: T, grid: T[][]): jest.CustomMatcherResult {
  const p1 = findPositionsOfValueInGrid(grid, expected)[0]
  if (!p1) return makeResult(false, 'Input value not found in grid')

  const p2 = findPositionsOfValueInGrid(grid, actual)[0]
  if (!p2) return makeResult(false, 'Expected value not found in grid')

  const pass = (p1.y > p2.y) || (p1.y === p2.y && p1.x > p2.x)

  const message = pass 
    ? ''
    : 'Input value comes before Expected value in grid'

  return makeResult(pass, message)
}

function findPositionsOfValueInGrid<T>(grid: T[][], value: T): {x: number, y: number}[] {
  const v = grid.map((v, y) => {
    const x = v.findIndex(col => col === value)
    if (x !== -1) return {x, y}
  })
  
  return v.filter(v => v !== undefined) as {x: number, y: number}[]
}

function makeResult(pass: boolean, message: string) {
  return {
    pass,
    message: () => message
  }
}