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
