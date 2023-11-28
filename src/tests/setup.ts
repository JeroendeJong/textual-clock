import { toBeAfterValueInGrid } from "./custom-grid-matchers";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAfterValueInGrid<T>(actual: T, grid: T[][]): CustomMatcherResult;
    }
  }
}

expect.extend({
  toBeAfterValueInGrid
});


export {}