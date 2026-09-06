import LetterGrid from "./letter-grid"
import { convertGridToLetterGridPosition, findSequentialNonDuplicatedGridPositionsForWords } from "../word-grid"
import { useEffect, useMemo, useState } from "react"
import { toDateObject } from "../utils"
import styled from "styled-components"
import { getSelectedLocale, localeOptions, makeLocale, type LocaleCode } from "../locale"

const Controls = styled.div`
  position: fixed;
  bottom: 16px;
  left: 16px;
  display: flex;
  gap: 8px;
`

const IconControl = styled.div`
  position: relative;
  width: 34px;
  height: 34px;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background: #000;
  color: var(--primary-color);
  display: grid;
  place-items: center;

  &:focus-within {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`

const LanguageSelector = styled.select.attrs({ name: 'Language' })`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  appearance: none;
  opacity: 0;
  cursor: pointer;

  option {
    color: #000;
    background: #fff;
  }
`

const FullscreenButton = styled.button`
  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background: #000;
  color: var(--primary-color);
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg aria-hidden="true" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
    {children}
  </svg>
)

function App() {
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [localeCode, setLocaleCode] = useState<LocaleCode>(getSelectedLocale);
  const [isFullscreen, setIsFullscreen] = useState(() => document.fullscreenElement !== null);

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

  useEffect(() => {
    const updateFullscreenState = () => setIsFullscreen(document.fullscreenElement !== null)

    document.addEventListener('fullscreenchange', updateFullscreenState)
    return () => document.removeEventListener('fullscreenchange', updateFullscreenState)
  }, [])

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

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen().catch(() => {
      // Fullscreen can be denied by browser or embedding permissions.
      // In this case, just do nothing. Normally a toast might be usefull.
    })
  }

  return (
    <div>
      <LetterGrid grid={letterGrid} highlightedCells={letterRanges} />
      {!isFullscreen && (
        <Controls>
          <IconControl title="Language">
            <Icon>
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </Icon>
            <LanguageSelector aria-label="Language" onChange={changeLocale} value={localeCode}>
              {localeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </LanguageSelector>
          </IconControl>
          <FullscreenButton aria-label="Enter fullscreen" onClick={enterFullscreen} title="Enter fullscreen" type="button">
            <Icon>
              <path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5" />
            </Icon>
          </FullscreenButton>
        </Controls>
      )}
    </div>
  )
}

export default App
