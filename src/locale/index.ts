import { LanguageTimeToText } from "../time-to-text/time-to-text";
import EnglishTimeToText from "./en-gb";
import DutchTimeToText from "./nl-nl";
import { RussianTimeToText } from "./ru-ru";

export const Languages = new Map<string, LanguageTimeToText>()
Languages.set('en-GB', new EnglishTimeToText())
Languages.set('en-us', new EnglishTimeToText())
Languages.set('en', new EnglishTimeToText())
Languages.set('nl-be', new DutchTimeToText())
Languages.set('nl', new DutchTimeToText())
Languages.set('ru', new RussianTimeToText())

export function makeLocale(): LanguageTimeToText {
  // if specifically requested, an override of the default is possible. 
  const params = new URLSearchParams(window.location.search)
  const locale = params.get('locale')!
  const override = Languages.get(locale)
  if (override) return override

  const dict = Languages.get(navigator.language);
  if (!dict) return Languages.get('en-GB')!
  return dict
}
