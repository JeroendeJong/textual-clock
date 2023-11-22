import LetterGrid from "./letter-grid"
import { convertDateToSpokenText, getHourWordsForLocale, getMinuteWordsForLocale, getOtherWordsForLocale } from "../random"
import { convertGridToLetterGridPosition, getGridPositionsForWords, makeGrid } from "../word-grid"
import { useEffect, useState } from "react"
import { toDateObject } from "../utils"
import { locale, localeGridSize } from '../locale'

function wordToLetterArray(words: string[]) {
  return words.reduce((agg: string[], curr) => {
    agg.push(...curr)
    return agg
  }, [])
}

let GRID: string[][] = []


const l = locale()
const minutes = getMinuteWordsForLocale(l)
const hours = getHourWordsForLocale(l)
const others = getOtherWordsForLocale(l)

GRID = makeGrid(minutes, localeGridSize(), GRID)
GRID = makeGrid(others, localeGridSize(), GRID)
GRID = makeGrid(hours, localeGridSize(), GRID)



const LETTER_GRID = GRID.map(row => wordToLetterArray(row))

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

  console.log(positions)

  return <LetterGrid grid={LETTER_GRID} highlightedCells={positions}/>
}

export default App