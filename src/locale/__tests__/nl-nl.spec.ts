import DutchTimeToText from "../nl-nl";

function makeTimeTest(hours: number, minutes: number): string[] {
  const text = new DutchTimeToText()
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  return text.makeTime(date)
}

describe('nl-nl', () => {

  describe('Time to Text',() => {

    test('00:00', () => {
      const time = makeTimeTest(12, 0)
      expect(time).toEqual(['twaalf', 'uur']);
    });
  
    test('12:00', () => {
      const time = makeTimeTest(12, 0)
      expect(time).toEqual(['twaalf', 'uur']);
    });
  
    test('12:05', () => {
      const time = makeTimeTest(12, 5)
      expect(time).toEqual(['vijf', 'over', 'twaalf']);
    });
  
    test('15:10', () => {
      const time = makeTimeTest(15, 10)
      expect(time).toEqual(['tien', 'over', 'drie']);
    });
  
    test('17:15', () => {
      const time = makeTimeTest(17, 15)
      expect(time).toEqual(['kwart', 'over', 'vijf']);
    });
  
    test('17:23', () => {
      const time = makeTimeTest(17, 23)
      expect(time).toEqual(['zeven', 'voor', 'half', 'zes']);
    });
  
    test('17:30', () => {
      const time = makeTimeTest(17, 30)
      expect(time).toEqual(['half', 'zes']);
    });
  
    test('20:31', () => {
      const time = makeTimeTest(20, 31)
      expect(time).toEqual(['een', 'over', 'half', 'negen']);
    });
  
    test('20:45', () => {
      const time = makeTimeTest(20, 45)
      expect(time).toEqual(['kwart', 'voor', 'negen']);
    });
  
    test('20:59', () => {
      const time = makeTimeTest(20, 59)
      expect(time).toEqual(['een', 'voor', 'negen']);
    });
  })
  
  describe('Text to Grid',() => {
  
    test(' "uur" to always be after "half" ', () => {
      const text = new DutchTimeToText()
      const GRID = text.makeGrid()
      expect('uur').toBeAfterValueInGrid('half', GRID)
    });

    test(' "half" to always be after "over" ', () => {
      const text = new DutchTimeToText()
      const GRID = text.makeGrid()
      expect('half').toBeAfterValueInGrid('over', GRID)
    });

    test(' "over" to always be after "kwart" ', () => {
      const text = new DutchTimeToText()
      const GRID = text.makeGrid()
      expect('over').toBeAfterValueInGrid('kwart', GRID)
    });

  })

})