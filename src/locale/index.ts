import enGB from "./en-gb";
import nlNL from "./nl-nl";

const map: { [k: string]: ClockLocale } = {
  'en-GB' : enGB,
  'en-us' : enGB,
  'en'    : enGB,
  'nl-be' : nlNL,
  'nl'    : nlNL
}

export function locale(): ClockLocale {
  const dict = map[navigator.language];
  if (!dict) return enGB
  return dict
}


export function getAllMinuteStrings(): string[] {
  return Object.values(locale().MINUTE_NUMBERS)
}

export function getAllHourStrings(): string[] {
  return Object.values(locale().HOUR_NUMBERS)
}

export function getOtherStrings(): string[] {
  const l = locale()
  return [
    l.HALF,
    l.PREPOSITION_AFTER,
    l.PREPOSITION_BEFORE,
    l.QUARTER,
    l.WHOLE_HOUR_SUFFIX
  ]
}

export function getAllStrings(): string[] {
  return [
    ...getAllMinuteStrings(),
    ...getAllHourStrings(),
    ...getOtherStrings()
  ]
}

export function getGridSize(): number {
  return locale().GRID_LENGTH
}