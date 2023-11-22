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

export function localeGridSize(): number {
  return locale().GRID_LENGTH
}