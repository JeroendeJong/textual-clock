import { isArrayEqual, shuffle } from "./utils";

export type GridPosition = {x: number, y: number}
export type GridPositionWithValue = {x: number, y: number, value: string}
export type LetterGridRange = {
  start: GridPosition,
  end: GridPosition
}

/**
 * Checks if a position of xy is within range of start xy's and end xy's.
 * @param position 
 * @param range 
 * @returns 
 */
export function isGridPositionWithinRange(position: GridPosition, range: LetterGridRange | LetterGridRange[]): boolean {
  if (Array.isArray(range)) {
    return range.some(rng => checkPosition(position, rng))
  } else {
    return checkPosition(position, range)
  }

  function checkPosition(p: GridPosition, r: LetterGridRange): boolean {
    return (
      p.x >= r.start.x && p.x < r.end.x &&
      p.y >= r.start.y && p.y <= r.end.y
    )
  }
}


/**
 * 
 * @param grid 
 * @param words 
 * @returns 
 */
export function getGridPositionsForWords(grid: string[][], words: string[]): GridPosition[] {
  const output: GridPositionWithValue[] = []

  grid.map((row, idx) => {
    findIndexes(row).forEach(value => {
      output.push({ ...value, y: idx  })
    })
  })

  const halfway = words.length / 2
  const result = words.map((w, i) => {
    if (i < halfway ) {
      return output.find(v => v.value === w)!
    } else {
      return output.reverse().find(v => v.value === w)!
    }
  })

  if (result.findIndex(v => v === undefined) !== -1) throw new Error('Value to highlight not found in grid!')

  return result;

  function findIndexes(arr: string[]): {x: number, value: string}[] {
   return words
    .map(v => arr.indexOf(v))
    .filter(v => v !== - 1)
    .map(i => ({x: i, value: arr[i]}))
  }
}

/**
 * converts a gridposition in word grid space to a range of letters in a letter grid space.
 * @param grid 
 * @param position 
 * @returns 
 */
export function convertGridToLetterGridPosition(grid: string[][], position: GridPosition): LetterGridRange {
  const start = {
    x: grid[position.y].reduce((agg, curr, currI) => {
      if (currI < position.x) return agg + curr.length
      return agg
    }, 0),
    y: position.y
  }

  const end = {
    x: start.x + grid[position.y][position.x].length,
    y: position.y
  }

  return {start, end}
}

/**
 * Create a 2D grid that fits all the words in the dictionary.
 * It optimizes the word packing according to a simple rectange packing algorithm
 * @param dictionary words to fit in the rectangle.
 * @param length length of the dictionary (x-direcition)
 * @returns 2D grid array.
 */
export function makeGrid(dictionary: string[], length: number, optionalGrid: string[][] = []): string[][] {
  if (dictionary.length === 0){
    return optionalGrid
  }

  let grid: string[][] = []

  let words = dictionary.sort((a,b) => b.length - a.length);

  // because we can feed in rows, specifically for the last row, add any values where possible.
  if (optionalGrid.length > 0) {
    const lastRow = optionalGrid[optionalGrid.length - 1]
    const output = placeWordsInArrayOfDeterminedSize(
      [...lastRow], 
      length,
      dictionary
    )

    const biggestRow = findBiggestLetterSize(output)
    const difference = biggestRow.filter(x => !lastRow.includes(x));

    optionalGrid[optionalGrid.length - 1] = biggestRow
    removeUsedWords(difference)
  }


  while (words.length !== 0) {
    const biggestWord = words[0]
    words.splice(0, 1);

    const row = placeWordsInArrayOfDeterminedSize([biggestWord], length, words)
    const biggestRow = findBiggestLetterSize(row)

    grid.push(biggestRow)
    removeUsedWords(biggestRow)
  }

  randomizeGrid();

  return [
    ...optionalGrid,
    ...grid
  ]

  function findBiggestLetterSize(data: string[][]) {
    const lengths = data.map(v => {
      const length = computeLetterCountForArray(v);
      return { value: v, length }
    })
    const sort = lengths.sort((a, b) => b.length - a.length)
    return sort[0].value
  }

  function removeUsedWords(remove: string[]) {
    remove.forEach(v => {
      const i = words.indexOf(v);
      if (i > -1) words.splice(i, 1);
    })
  }

  function randomizeGrid() {
    if (grid.length === 0) return;

    grid = grid.map(v => shuffle(v))

    // important here is to ensure the last row always stays last
    // this so that it might be filled with more data later!
    const lastGridRowIndex = grid.length - 1
    const lastGridRow = [...grid[lastGridRowIndex]]
    const shuffled = shuffle(grid)
    const movedLastRowIndex = shuffled.findIndex(r => isArrayEqual(r, lastGridRow))
    shuffled[movedLastRowIndex] = [...shuffled[grid.length - 1]]
    shuffled[shuffled.length - 1] = lastGridRow
  }
}

/**
 * Given an array of words {wordToFill}, it will find all the ways in which that array can be filled,
 * in such a way that no other word can be added. It does this with words from the {withWordList}
 * @param wordTofill 
 * @param requestedSize 
 * @param withWordList 
 * @returns 
 */
export function placeWordsInArrayOfDeterminedSize(wordTofill: string[], requestedSize: number, withWordList: string[]): string[][] {
  return recursivelySearchForWordGrids(wordTofill, requestedSize, withWordList)
}

//PRIVATE
function recursivelySearchForWordGrids(wordTofill: string[], requestedSize: number, withWordList: string[]): string[][] {
  const totalSize = computeLetterCountForArray(wordTofill)

  if (totalSize > requestedSize) {
    throw new Error('placeWordsInArrayOfDeterminedSize(): Input word can\'t fit the requested size!');
  } else if (withWordList.length === 0) {
    return [wordTofill];
  } else if (totalSize === requestedSize) {
    return [wordTofill];
  }

  const stillRequiredToFill = requestedSize - totalSize;
  const availableWords = withWordList.filter(v => v.length < stillRequiredToFill);

  if (availableWords.length === 0) {
    return [wordTofill];
  }

  const output = availableWords.map((word, i) => {
    const copyWords = [...wordTofill, word];
    const copyAvailable = [...availableWords];
    copyAvailable.splice(i, 1);

    const map = recursivelySearchForWordGrids(copyWords, requestedSize, copyAvailable);
    return map.map(v => {
      if (!Array.isArray(v)) return [v]
      else return v
    })
  });

  return output.flat(1)
}

export function computeLetterCountForArray(array: string[]): number {
  return array.reduce((a, c) => a + c.length, 0)
}

export function convertWordArrayToLetterArray(words: string[]) {
  return words.reduce((agg: string[], curr) => {
    agg.push(...curr)
    return agg
  }, [])
}