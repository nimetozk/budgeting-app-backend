/**
 * Task repository encapslates the logic required to access the 'Task' collection in the database.
 */

import BankAccountModel from "../schemas/bank-account-schema";
import TaskModel from "../schemas/task-schema";
import mongoose from "mongoose";

export const getBankNameByTaskId = async (taskId) => {
  const task = await TaskModel.findOne({ _id: taskId })
    .select("_id refBankAccount")
    .exec();

  const bankAccount = await BankAccountModel.findOne({
    _id: task.refBankAccount,
  })
    .populate("refBank", "name")
    .exec();

  return bankAccount.refBank.name;
};

export const taskList = (userId) => {
  const query = [];

  query.push([
    {
      $lookup: {
        from: "bankAccount",
        localField: "refBankAccount",
        foreignField: "_id",
        as: "bankAccount",
      },
    },
    { $unwind: { path: "$bankAccount", preserveNullAndEmptyArrays: false } },

    {
      $lookup: {
        from: "bank",
        localField: "bankAccount.refBank",
        foreignField: "_id",
        as: "bank",
      },
    },
    { $unwind: { path: "$bank", preserveNullAndEmptyArrays: false } },

    {
      $match: { "bankAccount.refUser": mongoose.Types.ObjectId(userId) },
    },

    {
      $project: {
        _id: 1,
        name: 1,
        uploadDate: 1,
        status: 1,
        "bankAccount.sortCode": 1,
        "bankAccount.accountNo": 1,
        "bank.name": 1,
      },
    },
  ]);

  return TaskModel.aggregate(query).exec();
};

export const getTaskById = (id, lean = false) => {
  return TaskModel.findById(id)
    .populate({
      path: "refBankAccount",
      select: "_id sortCode accountNo refBank uploadDate fileName",
      populate: { path: "refBank", select: "_id name" },
    })
    .lean(lean)
    .exec();
};
