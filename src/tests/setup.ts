import { toBeAfterValueInGrid } from "./custom-grid-matchers";
import { expect } from "vitest";
import "@testing-library/jest-dom/vitest";

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> {
    toBeAfterValueInGrid(expected: T, grid: T[][]): void;
  }
}

expect.extend({
  toBeAfterValueInGrid
});


export {}
