
export class TimeToText {

  private locale: ClockLocale

  constructor(locale: ClockLocale) {
    this.locale = locale;
  }

  /// HOUR

  public to12HString(date: Date): string {
    return this.locale.HOUR_NUMBERS[date.getHours() % 12];
  }

  public nextHourto12hString(date: Date) {
    return this.locale.HOUR_NUMBERS[(date.getHours() + 1) % 12];
  }

  public toWholeHourString(date: Date) {
    return this.locale.HOUR_NUMBERS[date.getHours() % 12];
  }

  /// MINUTES

  public minutes(date: Date): string {
    if (date.getMinutes() > 30) {
      throw new Error('minute to text request: Bigger than 30')
    }
    return this.locale.MINUTE_NUMBERS[date.getMinutes()]
  }

  public minutesAfter30Minutes(date: Date): string {
    const min = date.getMinutes()
    if (min < 30) {
      throw new Error('less than 30!!!!')
    }

    return this.locale.MINUTE_NUMBERS[min - 30]
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

}
