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
    15 :  'vijftien',
    16 :  'zestien',
    17 :  'zeventien',
    18 :  'achttien',
    19 :  'negentien',
    20 :  'twintig',
    21 :  'eenentwintig',
    22 :  'tweeëntwintig',
    23 :  'drieentwintig',
    24 :  'vierentwintig',
    25 :  'vijfentwintig',
    26 :  'zesentwintig',
    27 :  'zevenentwintig',
    28 :  'achtentwintig',
    29 :  'negenentwintig',
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

  GRID_SIZE = 25
  COMMON_LETTERS = ['e', 'n', 'a', 't', 'i', 'r']

  constructor() {
    super(LOCALE)
  }

  public getAllMinuteStrings(): string[] {
    return Object.values(LOCALE.MINUTE_NUMBERS)
  }

  public getAllHourStrings(): string[] {
    return Object.values(LOCALE.HOUR_NUMBERS)
  }

  public getOtherStrings(): string[] {
    return [
      LOCALE.HALF,
      LOCALE.PREPOSITION_AFTER,
      LOCALE.PREPOSITION_BEFORE,
      LOCALE.QUARTER,
      LOCALE.WHOLE_HOUR_SUFFIX
    ]
  }

  public getAllStrings(): string[] {
    return [
      ...this.getAllMinuteStrings(),
      ...this.getAllHourStrings(),
      ...this.getOtherStrings()
    ]
  }


  public makeTime(_: Date): string[] {
    return ['STUB']
  }

  public makeGrid(): string[][] {
    return [];
  }

}
