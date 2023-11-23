import { LanguageTimeToText, TimeToText } from "../time-to-text/time-to-text"
import { makeGrid } from "../word-grid"

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

  public GRID_SIZE = 20

  constructor() {
    super(LOCALE)
  }

  public makeTime(date: Date): string[] {
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

  public makeGrid(): string[][] {
    let GRID: string[][] = []

    const minutes = Object.values(LOCALE.MINUTE_NUMBERS)
    GRID = makeGrid(minutes, this.GRID_SIZE, GRID)
    
    const others = getOtherStrings()
    GRID = makeGrid(others, this.GRID_SIZE, GRID)

    const hours = Object.values(LOCALE.HOUR_NUMBERS)
    GRID = makeGrid(hours, this.GRID_SIZE, GRID)

    return GRID

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
