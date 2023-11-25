import LetterGrid from "./letter-grid"
import { convertGridToLetterGridPosition, getGridPositionsForWords } from "../word-grid"
import { useEffect, useState } from "react"
import { toDateObject } from "../utils"
import { makeLocale } from "../locale"

const locale = makeLocale()
const GRID = locale.makeGrid()
const LETTER_GRID = locale.makeLetterGrid(GRID, locale.COMMON_LETTERS)

function App() {
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      setHour(date.getHours());
      setMinute(date.getMinutes());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const time = locale.makeTime(toDateObject(hour, minute))

  const positions = getGridPositionsForWords(GRID, time)
    .map(p => convertGridToLetterGridPosition(GRID, p))

  return (
    <div>
      <LetterGrid grid={LETTER_GRID} highlightedCells={positions}/>
    </div>
  )
}

export default App