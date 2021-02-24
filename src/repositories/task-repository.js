import BankAccountModel from "../schemas/bank-account-schema";
import TaskModel from "../schemas/task-schema";

export const getBankNameByTaskId = async (taskId) => {
  const task = await TaskModel.findOne({ _id: taskId })
    .select("_id refBankAccount")
    .exec();
  const bankAccount = await BankAccountModel.findOne({
    _id: task.refBankAccount,
  })
    .select("bankName")
    .exec();

  return bankAccount.bankName;
};

export const taskList = () => {
  return TaskModel.find({})
    .populate({
      path: "refBankAccount",
      select: "accountNo sortCode refBank",
      populate: { path: "refBank", select: "name" },
    })
    .select("_id name uploadDate status")
    .lean(false)
    .exec();
};

export const getTaskById = (id) => {
  return TaskModel.findById(id)
    .populate({
      path: "refBankAccount",
      select: "_id sortCode accountNo refBank",
      populate: { path: "refBank", select: "_id name" },
    })
    .lean(false)
    .exec();
};
