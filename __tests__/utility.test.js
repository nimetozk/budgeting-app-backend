import { errorToString, IsnullOrEmpty, hashPassword } from "../src/util";
import { describe, expect, test, jest } from "@jest/globals";
import { validateDate } from "../src/excel-loaders/hsbc-bank-loader";

describe("util.js tests", () => {
  describe("IsnullOrEmpty ", () => {
    test("When the string is empty ", () => {
      const obje = "";
      expect(IsnullOrEmpty(obje)).toBe(true);
    });

    test("When the string is null ", () => {
      const obje = null;
      expect(IsnullOrEmpty(obje)).toBe(true);
    });

    test("When the string is not empty", () => {
      const obje = "test";
      expect(IsnullOrEmpty(obje)).toBe(false);
    });
  });
});

test("Date validation test ", () => {
  const date = "12/01/2020";
  const expectedDate = new Date("2020-01-12");

  expect(validateDate(date)).toEqual(expectedDate);
});

test("errorToString should return a message", () => {
  try {
    const value = 1 / 0;
  } catch (error) {
    expect(errorToString(error)).toBeDefined();
  }
});
