/**
 * Defines the dynamic schema for 'bank' documents stored in the database.
 *
 * This is the guide I followed: https://mongoosejs.com/docs/guide.html
 */

import mongoose, { Schema, Types } from "mongoose";

export const bankSchema = new Schema({
  name: String,
});

const BankModel = mongoose.model("bank", bankSchema, "bank");

export default BankModel;
