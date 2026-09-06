import LetterGrid from "./letter-grid"
import { convertGridToLetterGridPosition, findSequentialNonDuplicatedGridPositionsForWords } from "../word-grid"
import { useEffect, useMemo, useState } from "react"
import { toDateObject } from "../utils"
import styled from "styled-components"
import { getSelectedLocale, localeOptions, makeLocale, type LocaleCode } from "../locale"

const LanguageSelector = styled.select.attrs({ name: 'Language' })`
  position: fixed;
  bottom: 16px;
  left: 16px;
  padding: 6px 8px;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background: #000;
  color: var(--primary-color);
  font: inherit;
  font-size: 14px;
  cursor: pointer;
`

function App() {
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [localeCode, setLocaleCode] = useState<LocaleCode>(getSelectedLocale);

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
      <LanguageSelector aria-label="Language" onChange={changeLocale} value={localeCode}>
        {localeOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </LanguageSelector>
    </div>
  )
}

export default App
