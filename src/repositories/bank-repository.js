import BankModel from "../schemas/bank-schema";
import mongoose from "mongoose";

export const InsertBank = async (bank) => {
  const newBank = await bank.save();
  return newBank;
};

export const bankList = () => {
  return BankModel.find({}).select("_id name").lean(false).exec();
};

export const getBankById = (id) => {
  return BankModel.findById(id).lean(false).exec();
};