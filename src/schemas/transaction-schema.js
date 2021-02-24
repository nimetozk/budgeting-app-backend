import mongoose, { Schema } from "mongoose";
import { categorySchema } from "./category-schema";

const transactionSchema = new Schema({
  transactionDate: { type: Date },
  transactionType: String,
  transactionAmount: Number,
  externalCode: String,
  description: String,
  refTask: { type: mongoose.Types.ObjectId, ref: "task" },
  refCategory: categorySchema,
});

const TransactionModel = mongoose.model(
  "transaction",
  transactionSchema,
  "transaction"
);

export default TransactionModel;
