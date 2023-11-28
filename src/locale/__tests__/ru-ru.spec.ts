import { RussianTimeToText } from "../ru-ru";

function makeTimeTest(hours: number, minutes: number): string[] {
  const text = new RussianTimeToText()
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  return text.makeTime(date)
}

describe('ru-ru', () => {

  describe('Time to Text',() => {

    test('00:00', () => {
      const time = makeTimeTest(0, 0)
      expect(time).toEqual(['полночь']);
    });

    test('02:00', () => {
      const time = makeTimeTest(2, 0)
      expect(time).toEqual(['два', 'часа', 'ночи']);
    })

    test('04:00', () => {
      const time = makeTimeTest(4, 0)
      expect(time).toEqual(['четыре', 'часа', 'утра']);
    })

    test('12:00', () => {
      const time = makeTimeTest(12, 0)
      expect(time).toEqual(['полдень']);
    });

    test('12:05', () => {
      const time = makeTimeTest(12, 5)
      expect(time).toEqual(['двенадцать', 'часов', 'пять', 'минут', 'дня']);
    });

    test('15:10', () => {
      const time = makeTimeTest(15, 10)
      expect(time).toEqual(['три', 'часа', 'десять', 'минут', 'дня']);
    });

    test('17:15', () => {
      const time = makeTimeTest(17, 15)
      expect(time).toEqual(['пять', 'часов', 'пятнадцать', 'минут', 'дня']);
    });

    test('17:23', () => {
      const time = makeTimeTest(17, 23)
      expect(time).toEqual(['пять', 'часов', 'двадцать', 'три', 'минуты', 'дня']);
    });

    test('17:30', () => {
      const time = makeTimeTest(17, 30)
      expect(time).toEqual(['пять', 'часов', 'тридцать', 'минут', 'дня']);
    });

    test('20:31', () => {
      const time = makeTimeTest(20, 31)
      expect(time).toEqual(['восемь', 'часов', 'тридцать', 'одна', 'минута', 'вечера']);
    });

    test('20:45', () => {
      const time = makeTimeTest(20, 45)
      expect(time).toEqual(['восемь', 'часов', 'сорок', 'пять', 'минут', 'вечера']);
    });

    test('20:59', () => {
      const time = makeTimeTest(20, 59)
      expect(time).toEqual(['восемь', 'часов', 'пятьдесят', 'девять', 'минут', 'вечера']);
    });

  })

  describe('Text to Grid',() => {

    const hourAfterMinutes = [
      ['минут', 'час'],
      ['минут', 'часа'], 
      ['минут', 'часов'],
      ['минуты', 'час'],
      ['минуты', 'часа'],
      ['минуты', 'часов'],
      ['минута', 'час'],
      ['минута', 'часа'],
      ['минута', 'часов'],
    ]

    test.each(hourAfterMinutes)('%p to always be after %p', (minute, hour) => {
      const text = new RussianTimeToText()
      const GRID = text.makeGrid()
      expect(minute).toBeAfterValueInGrid(hour, GRID)
    });

    const timeOfDayAfterMinutes = [
      ['минут', 'вечера'],
      ['минут', 'дня'], 
      ['минут', 'утра'],
      ['минут', 'ночи'],
      ['минуты', 'вечера'],
      ['минуты', 'дня'], 
      ['минуты', 'утра'],
      ['минуты', 'ночи'],
      ['минута', 'вечера'],
      ['минута', 'дня'], 
      ['минута', 'утра'],
      ['минута', 'ночи'],
    ]

    test.each(timeOfDayAfterMinutes)('%p to always be after %p', () => {
      const text = new RussianTimeToText()
      const GRID = text.makeGrid()
      expect('вечера').toBeAfterValueInGrid('минут', GRID)
    });
  })
})
