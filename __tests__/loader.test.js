import loader from "../src/excel-loaders/bank-loader-factory";
import { describe, expect, test, jest } from "@jest/globals";
import loader_LLoyds from "../src/excel-loaders/llyods-bank-loader";
import loader_HSBC from "../src/excel-loaders/hsbc-bank-loader";

describe("loaders tests", () => {
  describe("Get Loader ", () => {
    test("HSBC loader", () => {
      const bank = "HSBC Bank";
      const expectedLoader = loader_HSBC;
      expect(loader(bank)).toEqual(expectedLoader);
    });
  });

  describe("Get Loader ", () => {
    test("LLoyds loader", () => {
      const bank = "LLoyds Bank";
      const expectedLoader = loader_LLoyds;
      expect(loader(bank)).toEqual(expectedLoader);
    });
  });
});
