/**
 * Bank account repository encapslates the logic required to access the 'Bank Account' collection in the database.
 */

import BankAccountModel from "../schemas/bank-account-schema";
import TaskModel from "../schemas/task-schema";

export const getBankAccountsByUser = (userId) => {
  return BankAccountModel.find({ refUser: userId })
    .populate("refBank", "name")
    .select("_id sortCode accountNo description currency country ")
    .lean(false)
    .exec();
};

export const hasUserBankAccounts = (userId) => {
  return BankAccountModel.exists({ refUser: userId });
};

export const getDeleteBankAccountById = async (id) => {
  const bankAccount = await BankAccountModel.findByIdAndDelete({
    _id: id,
  }).exec();
};

export const getCurrentUserBankAccounts = (userId, bankId) => {
  return BankAccountModel.find({
    refUser: userId,
    refBank: bankId,
  })
    .select("_id sortCode accountNo description")
    .lean(false)
    .exec();
};

export const existTasksByRefBankAccount = async (bankAccountId) => {
  const task = await TaskModel.findOne({ refBankAccount: bankAccountId })
    .lean(false)
    .select("_id")
    .exec();
  return task ? true : false;
};

export const getUserBankAccountCurrency = async (bankAccount) => {
  const currency = await BankAccountModel.findById({ _id: bankAccount })
    .select("currency")
    .lean(true)
    .exec();

  return currency;
};
