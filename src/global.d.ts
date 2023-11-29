export {}

/**
 * this version of typescript does not yet over support for the findLastIndex array function.
 * This is a minor polyfill to fix this.
 */
declare global {
  interface Array<T> {
    findLastIndex(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: any
    ): number
  }
}