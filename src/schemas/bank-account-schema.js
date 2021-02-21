import mongoose, { Schema, Types } from "mongoose";

export const bankAccountSchema = new Schema({
  accountNo: String,
  sortCode: String,
  description: String,
  currency: String,
  country: String,
  refBank: { type: mongoose.Types.ObjectId, ref: "bank" },
  refUser: { type: mongoose.Types.ObjectId, ref: "user" },
});

const BankAccountModel = mongoose.model(
  "bankAccount",
  bankAccountSchema,
  "bankAccount"
);

export default BankAccountModel;
