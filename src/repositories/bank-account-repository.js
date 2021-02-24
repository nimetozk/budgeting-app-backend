import BankAccountModel from "../schemas/bank-account-schema";

export const getBankAccountsByUser = (userId) => {
  return BankAccountModel.find({ refUser: userId })
    .populate("refBank", "name")
    .select("_id sortCode accountNo description currency country ")
    .lean(false)
    .exec();
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
