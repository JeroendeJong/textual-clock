import { LanguageTimeToText, TimeToText } from "../time-to-text/time-to-text"

const LOCALE = {
  MINUTE_NUMBERS: {
    1  : 'een',
    2  : 'twee',
    3  : 'drie',
    4  : 'vier',
    5  : 'vijf',
    6  : 'zes',
    7  : 'zeven',
    8  : 'acht',
    9  : 'negen',
    10 :  'tien',
    11 :  'elf',
    12 :  'twaalf',
    13 :  'dertien',
    14 :  'viertien',
    // 15 :  'vijftien',
    // 16 :  'zestien',
    // 17 :  'zeventien',
    // 18 :  'achttien',
    // 19 :  'negentien',
    // 20 :  'twintig',
    // 21 :  'eenentwintig',
    // 22 :  'tweeëntwintig',
    // 23 :  'drieentwintig',
    // 24 :  'vierentwintig',
    // 25 :  'vijfentwintig',
    // 26 :  'zesentwintig',
    // 27 :  'zevenentwintig',
    // 28 :  'achtentwintig',
    // 29 :  'negenentwintig',
  },
  WHOLE_HOUR_SUFFIX: 'uur',
  QUARTER: 'kwart',
  HALF: 'half',
  PREPOSITION_BEFORE: 'voor',
  PREPOSITION_AFTER: 'over',
  HOUR_NUMBERS: {
    0  : 'twaalf',
    1  : 'een',
    2  : 'twee',
    3  : 'drie',
    4  : 'vier',
    5  : 'vijf',
    6  : 'zes',
    7  : 'zeven',
    8  : 'acht',
    9  : 'negen',
    10 : 'tien',
    11 : 'elf',
    12 : 'twaalf'
  }
}

export default class DutchTimeToText extends TimeToText implements LanguageTimeToText {

  GRID_SIZE = 10
  COMMON_LETTERS = ['e', 'n', 'a', 't', 'i', 'r']

  constructor() {
    super(LOCALE)
  }


  public makeTime(date: Date): string[] {
    const minutes = date.getMinutes()

    const hourString = this.to12HString(date)
    const nextHourString = this.nextHourto12hString(date)

    const minuteString = this.minutes(date)

    if (minutes === 0) {
      return [hourString, LOCALE.WHOLE_HOUR_SUFFIX]
    } else if (minutes < 15) {
      // 6 over 3
      return [minuteString, LOCALE.PREPOSITION_AFTER, hourString]
    } else if (minutes === 15) {
      // kwart over 3
      return [LOCALE.QUARTER, LOCALE.PREPOSITION_AFTER, hourString]
    } else if (minutes > 15 && minutes < 30) {
      // 9 voor half 4
      const minutesBeforeThirty = this.minutesBefore30Minutes(date)
      return [minutesBeforeThirty, LOCALE.PREPOSITION_BEFORE, LOCALE.HALF, nextHourString]
    } else if (minutes === 30) {
      // half 4
      return [LOCALE.HALF, nextHourString]
    } else if (minutes > 30 && minutes < 45) {
      // 6 over half 4
      const minutesAfterThirty = this.minutesAfter30Minutes(date)
      return [minutesAfterThirty, LOCALE.PREPOSITION_AFTER, LOCALE.HALF, nextHourString]
    } else if (minutes === 45) {
      // kwart voor 4
      return [LOCALE.QUARTER, LOCALE.PREPOSITION_BEFORE, nextHourString]
    } else {
      // 8 voor 4
      const minutesBeforeHour = this.minutesFromWholeHour(date)
      return [minutesBeforeHour, LOCALE.PREPOSITION_BEFORE, nextHourString]
    } 
  }

  public makeGrid(): string[][] {
    const BUILD_ORDER = [
      Object.values(LOCALE.MINUTE_NUMBERS),
      [LOCALE.QUARTER],
      [
        LOCALE.PREPOSITION_AFTER,
        LOCALE.PREPOSITION_BEFORE,
      ],
      [LOCALE.HALF],
      Object.values(LOCALE.HOUR_NUMBERS),
      [LOCALE.WHOLE_HOUR_SUFFIX]
    ]
  
    return super.makeGridInOrder(BUILD_ORDER, this.GRID_SIZE)
  }

}
