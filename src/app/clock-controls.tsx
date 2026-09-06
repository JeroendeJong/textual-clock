import styled from "styled-components"
import { localeOptions, type LocaleCode } from "../locale"

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

type ClockControlsProps = {
  localeCode: LocaleCode
  onLocaleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onEnterFullscreen: () => void
}

export default function ClockControls({ localeCode, onLocaleChange, onEnterFullscreen }: ClockControlsProps) {
  return (
    <Controls>
      <IconControl title="Language">
        <Icon>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </Icon>
        <LanguageSelector aria-label="Language" onChange={onLocaleChange} value={localeCode}>
          {localeOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </LanguageSelector>
      </IconControl>
      <FullscreenButton aria-label="Enter fullscreen" onClick={onEnterFullscreen} title="Enter fullscreen" type="button">
        <Icon>
          <path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5" />
        </Icon>
      </FullscreenButton>
    </Controls>
  )
}
