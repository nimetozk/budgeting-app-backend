import mongoose, { Schema, Types } from "mongoose";

export const bankSchema = new Schema({
  name: String,
});

const BankModel = mongoose.model("bank", bankSchema, "bank");

export default BankModel;
