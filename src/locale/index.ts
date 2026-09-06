import { LanguageTimeToText } from "../time-to-text";
import EnglishTimeToText from "./en-gb";
import DutchTimeToText from "./nl-nl";
import { RussianTimeToText } from "./ru-ru";

export const Languages = new Map<string, LanguageTimeToText>()
Languages.set('en-gb', new EnglishTimeToText())
Languages.set('en-us', new EnglishTimeToText())
Languages.set('en', new EnglishTimeToText())
Languages.set('nl-be', new DutchTimeToText())
Languages.set('nl', new DutchTimeToText())
Languages.set('ru', new RussianTimeToText())

export const localeOptions = [
  { value: 'en', label: 'English' },
  { value: 'nl', label: 'Nederlands' },
  { value: 'ru', label: 'Русский' },
] as const

export type LocaleCode = typeof localeOptions[number]['value']

function getLocaleCode(locale: string | null): LocaleCode | undefined {
  const normalizedLocale = locale?.toLowerCase()
  if (!normalizedLocale) return undefined

  const language = normalizedLocale.split('-')[0]
  if (!Languages.has(normalizedLocale) && !Languages.has(language)) return undefined

  return language as LocaleCode
}

export function getSelectedLocale(): LocaleCode {
  // A locale in the URL takes precedence over the browser's language.
  const params = new URLSearchParams(window.location.search)
  return getLocaleCode(params.get('locale'))
    ?? getLocaleCode(navigator.language)
    ?? 'en'
}

export function makeLocale(localeCode = getSelectedLocale()): LanguageTimeToText {
  return Languages.get(localeCode)!
}
