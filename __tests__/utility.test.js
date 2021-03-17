import { errorToString, IsnullOrEmpty } from "../src/util";
import { describe, expect, test, jest } from "@jest/globals";
import { validateDate } from "../src/excel-loaders/hsbc-bank-loader";

describe("util.js test edilirken", () => {
  describe("IsnullOrEmpty ", () => {
    test("string bosluk verildiginde ", () => {
      const obje = "";
      expect(IsnullOrEmpty(obje)).toBe(true);
    });

    test("null  verildiginde ", () => {
      const obje = null;
      expect(IsnullOrEmpty(obje)).toBe(true);
    });

    test("dolu  verildiginde ", () => {
      const obje = "dolue";
      expect(IsnullOrEmpty(obje)).toBe(false);
    });
  });
});

test("validate test ", () => {
  const date = "12/01/2020";
  const expectedDate = new Date("2020-01-12");

  expect(validateDate(date)).toEqual(expectedDate);
});

test("errorToString should be returned string message", () => {
  try {
    const value = 1 / 0;
  } catch (error) {
    expect(errorToString(error)).toBeDefined();
  }
});
