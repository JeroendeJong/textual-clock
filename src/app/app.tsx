import LetterGrid from "./letter-grid"
import ClockControls from "./clock-controls"
import { convertGridToLetterGridPosition, findSequentialNonDuplicatedGridPositionsForWords } from "../word-grid"
import { useEffect, useMemo, useState } from "react"
import { toDateObject } from "../utils"
import { getSelectedLocale, makeLocale, type LocaleCode } from "../locale"
import { useFullscreen } from "../use-fullscreen"

function App() {
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [localeCode, setLocaleCode] = useState<LocaleCode>(getSelectedLocale);
  const { isFullscreen, enterFullscreen } = useFullscreen()

  const { locale, grid, letterGrid } = useMemo(() => {
    const selectedLocale = makeLocale(localeCode)
    const selectedGrid = selectedLocale.makeGrid()

    return {
      locale: selectedLocale,
      grid: selectedGrid,
      letterGrid: selectedLocale.makeLetterGrid(selectedGrid, selectedLocale.COMMON_LETTERS),
    }
  }, [localeCode])

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      setHour(date.getHours());
      setMinute(date.getMinutes());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const time = locale.makeTime(toDateObject(hour, minute))
  const positions = findSequentialNonDuplicatedGridPositionsForWords(grid, time)
  const letterRanges = positions.map(p => convertGridToLetterGridPosition(grid, p))

  const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as LocaleCode
    setLocaleCode(nextLocale)

    const url = new URL(window.location.href)
    url.searchParams.set('locale', nextLocale)
    window.history.replaceState({}, '', url)
  }

  return (
    <div>
      <LetterGrid grid={letterGrid} highlightedCells={letterRanges} />
      {!isFullscreen && (
        <ClockControls
          localeCode={localeCode}
          onEnterFullscreen={enterFullscreen}
          onLocaleChange={changeLocale}
        />
      )}
    </div>
  )
}

export default App
