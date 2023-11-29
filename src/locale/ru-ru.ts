import { LanguageTimeToText, TimeToText } from "../time-to-text"

const LOCALE = {
  MINUTE_NUMBERS: {
    20 :  'двадцать',
    30 :  'тридцать',
    40 :  'сорок',
    50 :  'пятьдесят',

    1  : 'одна',
    2  : 'две',
    3  : 'три',
    4  : 'четыре',
    5  : 'пять',
    6  : 'шесть',
    7  : 'семь',
    8  : 'восемь',
    9  : 'девять',

    10 :  'десять',
    11 :  'одиннадцать',
    12 :  'двенадцать',
    13 :  'тринадцать',
    14 :  'четырнадцать',
    15 :  'пятнадцать',
    16 :  'шестнадцать',
    17 :  'семнадцать',
    18 :  'восемнадцать',
    19 :  'девятнадцать',
  },

  WHOLE_HOUR_SUFFIX_FOR_ONE: 'час',     // nominative singular
  WHOLE_HOUR_SUFFIX_FOR_TWO_THREE_FOUR: 'часа',    // genetive singular
  WHOLE_HOUR_SUFFIX_FOR_FIVE_AND_MORE: 'часов',   // genetive plural

  MINUTE_STRING_FOR_ONE: 'минута',      // nominative singular 
  MINUTE_STRING_FOR_TWO_THREE_FOUR: 'минуты',      // genetive singular
  MINUTE_STRING_FOR_FIVE_AND_MORE: 'минут',       // genetive plural

  TIME_OF_DAY: {
    NIGHT : 'ночи', // 24:00 t/m 03:00
    MORNING: 'утра', // 04:00 t/m 11:00
    DAY: 'дня', // 12:00 t/m 17:00
    EVENING : 'вечера', // 18:00 t/m 23:00
  },

  SPECIAL_NOTATIONS: {
    NOON: 'полдень',
    MIDNIGHT: 'полночь'
  },

  HOUR_NUMBERS: {
    0  : 'двенадцать', 
    1  : 'один',
    2  : 'два',
    3  : 'три',
    4  : 'четыре',
    5  : 'пять',
    6  : 'шесть',
    7  : 'семь',
    8  : 'восемь',
    9  : 'девять',
    10 :  'десять',
    11 :  'одиннадцать',
    12 :  'двенадцать',
  }
}

export class RussianTimeToText extends TimeToText implements LanguageTimeToText {

  GRID_SIZE = 25
  COMMON_LETTERS = ['о', 'е', 'а', 'и', 'н', 'т', 'с']

  constructor() {
    super(LOCALE)
  }

  public russianMinutes(date: Date): string[] {
    const minutes = date.getMinutes()
    if (minutes < 21) return [this.locale.MINUTE_NUMBERS[minutes]]

    const tens = Math.floor(minutes / 10) * 10
    if (tens === minutes) return [this.locale.MINUTE_NUMBERS[tens]]
    return [
      this.locale.MINUTE_NUMBERS[tens], 
      this.locale.MINUTE_NUMBERS[minutes - tens]
    ]
  }

  public makeTime(date: Date): string[] {
    if (this.isNoon(date)) return [LOCALE.SPECIAL_NOTATIONS.NOON]
    if (this.isMidnight(date)) return [LOCALE.SPECIAL_NOTATIONS.MIDNIGHT]

    const hour = this.to12HString(date)
    const hourSuffix = getHourSuffixString()
    const timeOfDay = getTimeOfDayString()

    if (this.isFullHour(date)) return [hour, hourSuffix, timeOfDay]

    const minutes = this.russianMinutes(date)
    const minuteSuffix = getMinuteSuffixString()

    return [hour, hourSuffix, ...minutes, minuteSuffix, timeOfDay]

    function getHourSuffixString() {
      switch (date.getHours() % 12) {
        case 1: return LOCALE.WHOLE_HOUR_SUFFIX_FOR_ONE
        case 2:
        case 3:
        case 4: return LOCALE.WHOLE_HOUR_SUFFIX_FOR_TWO_THREE_FOUR
        default: return LOCALE.WHOLE_HOUR_SUFFIX_FOR_FIVE_AND_MORE
      }
    }

    function getMinuteSuffixString() {
      const min = date.getMinutes()
      const lastDigit = min % 10
      const firstDigit = Number((min + '')[0])
      if (firstDigit === 1) {
        // 10 to 19 are special cases and always are genetive plural.
        return LOCALE.MINUTE_STRING_FOR_FIVE_AND_MORE 
      }

      switch (lastDigit) {
        case 1: return LOCALE.MINUTE_STRING_FOR_ONE
        case 2:
        case 3:
        case 4: return LOCALE.MINUTE_STRING_FOR_TWO_THREE_FOUR
        default: return LOCALE.MINUTE_STRING_FOR_FIVE_AND_MORE
      }
    }

    function getTimeOfDayString() {
      const hour = date.getHours();

      const isNight = [24, 0, 1, 2, 3].includes(hour)
      if (isNight) return LOCALE.TIME_OF_DAY.NIGHT

      const isMorning = [4, 5, 6, 7, 8, 9, 10, 11].includes(hour)
      if (isMorning) return LOCALE.TIME_OF_DAY.MORNING

      const isDay = [12, 13, 14, 15, 16, 17].includes(hour)
      if (isDay) return LOCALE.TIME_OF_DAY.DAY

      const isEvening = [18, 19, 20, 21, 22, 23].includes(hour)
      if (isEvening) return LOCALE.TIME_OF_DAY.EVENING

      throw new Error('no Appropriate time of day found!')
    }
  }

  public makeGrid(): string[][] {
    const BUILD_ORDER = [
      Object.values(LOCALE.HOUR_NUMBERS),
      getHourSuffixStrings(), 
      Object.values(LOCALE.SPECIAL_NOTATIONS),
      seperateNumbers()[1],
      seperateNumbers()[0],
      getMinutesSuffixStrings(),
      Object.values(LOCALE.TIME_OF_DAY)
    ];

    return super.makeGridInOrder(BUILD_ORDER, this.GRID_SIZE)

    function seperateNumbers(): string[][] {
      const {20: twenty, 30: thirthy, 40: fourthy, 50: fifthy, ...rest} = LOCALE.MINUTE_NUMBERS

      return [
        Object.values(rest),
        [twenty, thirthy, fourthy, fifthy]
      ]
    }

    function getHourSuffixStrings() {
      return [
        LOCALE.WHOLE_HOUR_SUFFIX_FOR_ONE,
        LOCALE.WHOLE_HOUR_SUFFIX_FOR_TWO_THREE_FOUR,
        LOCALE.WHOLE_HOUR_SUFFIX_FOR_FIVE_AND_MORE,
      ]
    }

    function getMinutesSuffixStrings() {
      return [
        LOCALE.MINUTE_STRING_FOR_ONE,
        LOCALE.MINUTE_STRING_FOR_TWO_THREE_FOUR,
        LOCALE.MINUTE_STRING_FOR_FIVE_AND_MORE,
      ]
    }
  }
}