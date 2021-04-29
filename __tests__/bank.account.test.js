import { describe, expect, test, jest, it } from "@jest/globals";
import * as bankAccountRepository from "../src/repositories/bank-account-repository";
import { Types } from "mongoose";

describe("Bank Account", () => {
  it("Get Bank Account By User Id", async () => {
    await bankAccountRepository
      .getBankAccountsByUser(Types.ObjectId("605047a3a7fdfa4338331d9e"))
      .then((res) => {
        expect(res).toBeDefined();
      });
  });

  it("Delete Bank Account By Id", async () => {
    await bankAccountRepository
      .getDeleteBankAccountById(Types.ObjectId("608a164f2942f80036640c33"))
      .then((res) => {
        expect(res).toBeUndefined();
      });
  });

  it("Get User Bank Accounts ", async () => {
    await bankAccountRepository
      .hasUserBankAccounts(Types.ObjectId("605047a3a7fdfa4338331d9e"))
      .then((res) => {
        expect(res).toBeDefined();
      });
  });

  it("Get Current User Bank Accounts ", async () => {
    await bankAccountRepository
      .getCurrentUserBankAccounts(
        Types.ObjectId("605047a3a7fdfa4338331d9e"),
        Types.ObjectId("60302cc28e25101c0c457af2")
      )
      .then((res) => {
        expect(res).toBeDefined();
      });
  });

  it("Exist Tasks By Ref Bank Account ", async () => {
    await bankAccountRepository
      .existTasksByRefBankAccount(Types.ObjectId("60690ba006886500369a2d9c"))
      .then((res) => {
        expect(res).toBeDefined();
      });
  });

  it("Get Bank Account Currency ", async () => {
    await bankAccountRepository
      .getUserBankAccountCurrency(Types.ObjectId("60690ba006886500369a2d9c"))
      .then((res) => {
        expect(res).toBeDefined();
      });
  });
});
