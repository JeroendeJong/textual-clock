import enGB from './locale/en-gb'
import { TimeToText } from './time-to-text'


export function convertDateToSpokenText(date: Date, locale: ClockLocale = enGB): string[] {
  const text = new TimeToText(locale);
  if (text.isPastHalfHour(date)) { 
    const hour = text.nextHourto12hString(date)
    const minute = text.isQuarterHour(date)
      ? locale.QUARTER
      : text.minutesFromWholeHour(date)
    return [minute, locale.PREPOSITION_BEFORE, hour];

  } else {
    const hour = text.to12HString(date)
    const isFullHour = date.getMinutes() === 0
    if (isFullHour) return [hour, locale.WHOLE_HOUR_SUFFIX]

    const minute = text.isQuarterHour(date)
      ? locale.QUARTER
      : text.minutes(date)

    return [minute, locale.PREPOSITION_AFTER, hour];
  }
}

export function getMinuteWordsForLocale(locale: ClockLocale): string[] {
  return Object.values(locale.MINUTE_NUMBERS)
}

export function getHourWordsForLocale(locale: ClockLocale): string[] {
  return Object.values(locale.HOUR_NUMBERS)
}

export function getOtherWordsForLocale(locale: ClockLocale): string[] {
  return [
    locale.HALF,
    locale.PREPOSITION_AFTER,
    locale.PREPOSITION_BEFORE,
    locale.QUARTER,
    locale.WHOLE_HOUR_SUFFIX
  ]
}
