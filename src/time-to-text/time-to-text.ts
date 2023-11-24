import { getMaxLength, randomArrayItem } from "../utils";
import { convertWordArrayToLetterArray, makeGrid } from "../word-grid";

export interface LanguageTimeToText extends TimeToText {
  GRID_SIZE: number

  /**
   * Provide the common letters in the language that aim fill any gaps that remain!
   * Array must have a length of atleast 5!
   */
  COMMON_LETTERS: string[] 
  makeTime(date: Date): string[]
  makeGrid(): string[][]
}

export class TimeToText {

  public locale: BaseLocale

  constructor(locale: BaseLocale) {
    this.locale = locale;
  }

  /// HOUR

  public to12HString(date: Date): string {
    return this.locale.HOUR_NUMBERS[date.getHours() % 12];
  }

  public nextHourto12hString(date: Date): string {
    return this.locale.HOUR_NUMBERS[(date.getHours() + 1) % 12];
  }

  public toWholeHourString(date: Date): string {
    return this.locale.HOUR_NUMBERS[date.getHours() % 12];
  }


  /// MINUTES

  public minutes(date: Date): string {
    return this.locale.MINUTE_NUMBERS[date.getMinutes()]
  }

  public minutesAfter30Minutes(date: Date): string {
    const min = date.getMinutes()
    if (min < 30) throw new Error('less than 30!!!!')

    return this.locale.MINUTE_NUMBERS[min - 30]
  }

  public minutesBefore30Minutes(date: Date): string {
    const min = date.getMinutes()
    if (min > 30) throw new Error('more than 30!!!!')

    return this.locale.MINUTE_NUMBERS[30 - min]
  }


  public minutesFromWholeHour(date: Date): string {
    const min = date.getMinutes()
    return this.locale.MINUTE_NUMBERS[60 - min]
  }

  public isQuarterHour(date: Date): boolean {
    return date.getMinutes() === 15 || date.getMinutes() === 45
  }
  
  public isPastHalfHour(date: Date): boolean {
    return date.getMinutes() > 30
  }

  public isNoon(date: Date): boolean {
    return date.getHours() === 12;
  }

  public isMidnight(date: Date): boolean {
    return date.getHours() === 0;
  }


  // GRID BUILDER

  public makeGridInOrder(wordsInOrder: string[][], size: number): string[][] {
    let GRID: string[][] = []

    wordsInOrder.forEach(words => {
      GRID = makeGrid(words, size, GRID)
    })
    
    return GRID
  }

  public makeLetterGrid(grid: string[][], randomLetters: string[]): string[][] {
    const letterArray = grid.map(row => convertWordArrayToLetterArray(row))
    const maxLength = getMaxLength(letterArray)
    return letterArray.map(row => {
      while (row.length < maxLength) {
        row.push(randomArrayItem(randomLetters))
      }
      return row
    })
  }
}
