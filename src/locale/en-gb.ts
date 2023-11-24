import { LanguageTimeToText, TimeToText } from "../time-to-text/time-to-text"

const LOCALE = {
  MINUTE_NUMBERS: {
    1  : 'one',
    2  : 'two',
    3  : 'three',
    4  : 'four',
    5  : 'five',
    6  : 'six',
    7  : 'seven',
    8  : 'eight',
    9  : 'nine',
    10 :  'ten',
    11 :  'eleven',
    12 :  'twelve',
    13 :  'thirteen',
    14 :  'fourteen',
    15 :  'fiveteen',
    16 :  'sixteen',
    17 :  'seventeen',
    18 :  'eighteen',
    19 :  'ninetine',
    20 :  'twenty',
    21 :  'twentyone',
    22 :  'twentytwo',
    23 :  'twentythree',
    24 :  'twentyfour',
    25 :  'twentyfive',
    26 :  'twentysix',
    27 :  'twentyseven',
    28 :  'twentyeight',
    29 :  'twentynine',
  },
  WHOLE_HOUR_SUFFIX: 'o\' clock',
  QUARTER: 'quarter',
  HALF: 'half',
  PREPOSITION_BEFORE: 'to', 
  PREPOSITION_AFTER: 'past',
  HOUR_NUMBERS: {
    0  : 'twelve',
    1  : 'one',
    2  : 'two',
    3  : 'three',
    4  : 'four',
    5  : 'five',
    6  : 'six',
    7  : 'seven',
    8  : 'eight',
    9  : 'nine',
    10 :  'ten',
    11 :  'eleven',
    12 :  'twelve',
  }
}

export default class EnglishTimeToText extends TimeToText implements LanguageTimeToText {

  GRID_SIZE = 20

  COMMON_LETTERS = ['e', 'a', 'r', 'i', 'o', 't', 'n']

  constructor() {
    super(LOCALE)
  }

  makeTime(date: Date): string[] {
    if (this.isPastHalfHour(date)) { 
      const hour = this.nextHourto12hString(date)
      const minute = this.isQuarterHour(date)
        ? LOCALE.QUARTER
        : this.minutesFromWholeHour(date)
      return [minute, LOCALE.PREPOSITION_BEFORE, hour];
  
    }

    const hour = this.to12HString(date)
    const isFullHour = date.getMinutes() === 0
    if (isFullHour) return [hour, LOCALE.WHOLE_HOUR_SUFFIX]

    const minute = this.isQuarterHour(date)
      ? LOCALE.QUARTER
      : this.minutes(date)

    return [minute, LOCALE.PREPOSITION_AFTER, hour];
  }

  makeGrid(): string[][] {
    const BUILD_ORDER = [
      Object.values(LOCALE.MINUTE_NUMBERS),
      getOtherStrings(),
      Object.values(LOCALE.HOUR_NUMBERS)
    ]
  
    return super.makeGridInOrder(BUILD_ORDER, this.GRID_SIZE)

    function getOtherStrings(): string[] {
      return [
        LOCALE.HALF,
        LOCALE.PREPOSITION_AFTER,
        LOCALE.PREPOSITION_BEFORE,
        LOCALE.QUARTER,
        LOCALE.WHOLE_HOUR_SUFFIX
      ]
    }
  }

}
