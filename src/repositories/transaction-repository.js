import TaskModel from "../schemas/task-schema";
import TransactionModel from "../schemas/transaction-schema";

export const saveAllTransactions = async (transactions) => {
  const arrayPromises = [];

  transactions.forEach(async (transaction) => {
    arrayPromises.push(transaction.save());
  });

  await Promise.all(arrayPromises);
};

export const getTransactionsByTaskId = (taskId) => {
  return TransactionModel.find().where("refTask").equals(taskId).exec();
};
