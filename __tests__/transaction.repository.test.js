import { describe, expect, test, jest, it } from "@jest/globals";
import * as transactionRepository from "../src/repositories/transaction-repository";
import { Types } from "mongoose";

describe("Transaction", () => {
  it("Get Transactions by Task Id", async () => {
    expect.assertions(2);
    await transactionRepository
      .getTransactionsByTaskId(Types.ObjectId("60690bde06886500369a2d9d"))
      .then((res) => {
        expect(res).toBeDefined();
        expect(res.length).toBeGreaterThanOrEqual(0);
      });
  });

  it("Get Place Labels", async () => {
    await transactionRepository
      .getPlaceLabels(Types.ObjectId("605047a3a7fdfa4338331d9e"))
      .then((res) => {
        expect(res).toBeDefined();
        expect(res.length).toBeGreaterThanOrEqual(0);
      });
  });

  it("Delete Place Labels", async () => {
    await transactionRepository
      .deletePlaceLabel("12345678 update")
      .then((res) => {
        expect(res).toBeDefined();
      });
  });

  it("Get Place Label Id By Name", async () => {
    await transactionRepository
      .getPlaceLabelIdByName(
        Types.ObjectId("605047a3a7fdfa4338331d9e"),
        "12345678 update"
      )
      .then((res) => {
        expect(res).toBeDefined();
      });
  });

  it("Get Transaction By Id", async () => {
    await transactionRepository
      .getTransactionsByTaskId(Types.ObjectId("6081de6a5e62320036669dee"))
      .then((res) => {
        expect(res).toBeDefined();
      });
  });

  it("Location Total Amount ", async () => {
    await transactionRepository
      .locationTotalAmount(Types.ObjectId("605047a3a7fdfa4338331d9e"))
      .then((res) => {
        expect(res).toBeDefined();
      });
  });

  it("Get Month Group Transactions", async () => {
    await transactionRepository
      .getMonthGroupTransactions(
        "2020",
        Types.ObjectId("605047a3a7fdfa4338331d9e")
      )
      .then((res) => {
        expect(res).toBeDefined();
      });
  });
});
