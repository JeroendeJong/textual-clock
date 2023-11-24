
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
  const a = array2D.map(v => v.length).sort((a, b) => b - a)
  return a[0]
}

export function randomArrayItem<T>(arr: T[]): T {
  return arr[ Math.floor(Math.random() * arr.length) ];
}


export function isArrayEqual<T>(arr1: T[], arr2: T[]) {
  let count = 0;
  for(let i = 0; i < arr1.length; i++) {
    for(let j = 0; j < arr2.length; j++) {
      if(arr1[i] == arr2[j]) {
        count++
      }
    }
  }
  return  arr1.length == arr2.length && count == arr1.length ? true : false;
}