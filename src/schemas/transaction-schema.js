import mongoose, { Schema } from "mongoose";
import { categorySchema } from "./category-schema";
import { placeLabelSchema } from "./place-label-schema";

const transactionSchema = new Schema({
  transactionDate: { type: Date },
  transactionType: String,
  transactionAmount: { type: Number },
  externalCode: String,
  description: String,
  refTask: { type: mongoose.Types.ObjectId, ref: "task" },
  refCategory: categorySchema,
  refPlaceLabel: placeLabelSchema,
});

const TransactionModel = mongoose.model(
  "transaction",
  transactionSchema,
  "transaction"
);

export default TransactionModel;
