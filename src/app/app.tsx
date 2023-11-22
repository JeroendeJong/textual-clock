import LetterGrid from "./letter-grid"
import { convertDateToSpokenText,  } from "../random"
import { convertGridToLetterGridPosition, convertWordArrayToLetterArray, getGridPositionsForWords, makeGrid } from "../word-grid"
import { useEffect, useState } from "react"
import { toDateObject } from "../utils"
import { getAllHourStrings, getAllMinuteStrings, getGridSize, getOtherStrings, locale } from '../locale'

const minutes = getAllMinuteStrings()
const hours = getAllHourStrings()
const others = getOtherStrings()
const size = getGridSize()

let GRID: string[][] = []
GRID = makeGrid(minutes, size, GRID)
GRID = makeGrid(others, size, GRID)
GRID = makeGrid(hours, size, GRID)

const LETTER_GRID = GRID.map(row => convertWordArrayToLetterArray(row))

function App() {
  const [hour, setHour] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      setHour(date.getHours());
      setMinutes(date.getMinutes());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const time = convertDateToSpokenText(toDateObject(hour, minutes), locale())
  const positions = getGridPositionsForWords(GRID, time)
    .map(p => convertGridToLetterGridPosition(GRID, p))

  return (
    <div>
      <LetterGrid grid={LETTER_GRID} highlightedCells={positions}/>
    </div>
  )
}

export default App