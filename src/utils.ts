
export function shuffle<T>(array: T[]) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function toDateObject(hours: number, minutes: number): Date {
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  return date
}

export function getMaxLength<T>(array2D: T[][]): number {
  const a = array2D.map(v => v.length).sort()
  return a[a.length - 1]
}