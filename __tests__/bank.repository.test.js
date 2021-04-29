import { describe, expect, test, jest, it } from "@jest/globals";
import * as bankRepository from "../src/repositories/bank-repository";
import { Types } from "mongoose";

describe("Bank", () => {
  it("Bank List", async () => {
    await bankRepository.bankList().then((res) => {
      expect(res).toBeDefined();
    });
  });

  it("Bank List", async () => {
    await bankRepository
      .getBankById(Types.ObjectId("60302cc28e25101c0c457af2"))
      .then((res) => {
        expect(res).toBeDefined();
      });
  });
});
