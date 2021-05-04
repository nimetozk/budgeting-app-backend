import { describe, expect, test, jest, it } from "@jest/globals";
import * as bankRepository from "../src/repositories/bank-repository";
import { Types } from "mongoose";
import BankModel from "../src/schemas/bank-schema";

describe("Bank", () => {
  describe("insert bank ", () => {
    it("bank insert", async () => {
      let bank = new BankModel({ name: "Test" });

      bank = await bankRepository.InsertBank(bank);
      expect(bank._id).toBeDefined();
    });
  });

  describe("bank list", () => {
    it("Bank List", async () => {
      const bankList = await bankRepository.bankList();
      expect(bankList.length).toBeGreaterThan(0);
    });
  });
});
