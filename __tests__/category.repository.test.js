import { describe, expect, test, jest, it } from "@jest/globals";
import * as categoryRepository from "../src/repositories/category-repository";

describe("Category", () => {
  describe("When inserted ", () => {
    it("It should be retuned by _id", async () => {
      expect.assertions(1);
      await categoryRepository.insertCategory("GENERAL", "GNR").then((res) => {
        expect(res._id).toBeDefined();
      });
    });
  });

  describe("After install general category", () => {
    it("It should be read for general category", async () => {
      expect.assertions(2);
      await categoryRepository.getGeneralCategory().then((res) => {
        expect(res).toBeDefined();
        expect(res.name).toBe("GENERAL");
      });
    });
  });

  describe("Get category list", () => {
    test("Test get category list", async () => {
      expect.assertions(2);
      await categoryRepository.getCategoryList().then((res) => {
        expect(res).toBeDefined();
        expect(res.length).toBeGreaterThan(0);
      });
    });
  });
});
