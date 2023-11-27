import EnglishTimeToText from "../en-gb";

function makeTimeTest(hours: number, minutes: number): string[] {
  const text = new EnglishTimeToText()
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  return text.makeTime(date)
}

describe('English Locale Time to Text',() => {

  test('00:00', () => {
    const time = makeTimeTest(12, 0)
    expect(time).toEqual(['twelve', 'o\' clock']);
  });

  test('12:00', () => {
    const time = makeTimeTest(12, 0)
    expect(time).toEqual(['twelve', 'o\' clock']);
  });

  test('12:05', () => {
    const time = makeTimeTest(12, 5)
    expect(time).toEqual(['five', 'past', 'twelve']);
  });

  test('15:10', () => {
    const time = makeTimeTest(15, 10)
    expect(time).toEqual(['ten', 'past', 'three']);
  });

  test('17:15', () => {
    const time = makeTimeTest(17, 15)
    expect(time).toEqual(['quarter', 'past', 'five']);
  });

  test('17:23', () => {
    const time = makeTimeTest(17, 23)
    expect(time).toEqual(['twentythree', 'past', 'five']);
  });

  test('17:30', () => {
    const time = makeTimeTest(17, 30)
    expect(time).toEqual(['half', 'past', 'six']);
  });

  test('20:31', () => {
    const time = makeTimeTest(20, 31)
    expect(time).toEqual(['twentynine', 'to', 'nine']);
  });

  test('20:45', () => {
    const time = makeTimeTest(20, 45)
    expect(time).toEqual(['quarter', 'to', 'nine']);
  });

  test('20:59', () => {
    const time = makeTimeTest(20, 59)
    expect(time).toEqual(['one', 'to', 'nine']);
  });
})
