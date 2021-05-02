/**
 * Transaction repository encapslates the logic required to access the 'Transaction' collection in the database.
 */

import { Types } from "mongoose";
import TaskModel from "../schemas/task-schema";
import TransactionModel from "../schemas/transaction-schema";
import PlaceLabelModel from "../schemas/place-label-schema";

/* istanbul ignore next */
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

export const partialUpdate = async (transaction, id) => {
  const transactionModel = await TransactionModel.findOne({ _id: id }).exec();
  transactionModel.transactionDate = transaction.transactionDate;
  transactionModel.transactionType = transaction.transactionType;
  transactionModel.transactionAmount = transaction.transactionAmount;
  transactionModel.externalCode = transaction.externalCode;
  transactionModel.description = transaction.description;
  transactionModel.refTask = transaction.refTask;
  transactionModel.refCategory = transaction.refCategory;
  transactionModel.refPlaceLabel = transaction.refPlaceLabel;
  transactionModel.save();
};

export const getCategoryGroupTransactions = (
  income,
  bankId,
  startDate,
  endDate,
  userId
) => {
  const query = [];

  query.push(
    {
      $lookup: {
        from: "task",
        localField: "refTask",
        foreignField: "_id",
        as: "task",
      },
    },
    { $unwind: { path: "$task", preserveNullAndEmptyArrays: false } },

    {
      $lookup: {
        from: "bankAccount",
        localField: "task.refBankAccount",
        foreignField: "_id",
        as: "bankAccount",
      },
    },

    { $unwind: { path: "$bankAccount", preserveNullAndEmptyArrays: false } },

    {
      $match: { "bankAccount.refUser": Types.ObjectId(userId) },
    }
  );

  if (bankId) {
    query.push({
      $match: { "bankAccount.refBank": Types.ObjectId(bankId) },
    });
  }

  if (income) {
    query.push({
      $match: { transactionType: income ? "credit" : "debit" },
    });
  }

  if (startDate) {
    query.push({
      $match: { transactionDate: { $gte: new Date(startDate) } },
    });
  }

  if (endDate) {
    query.push({
      $match: { transactionDate: { $lte: new Date(endDate) } },
    });
  }

  query.push(
    {
      $group: {
        _id: "$refCategory.name",
        totalAmount: { $sum: "$transactionAmount" },
        count: { $sum: 1 },
      },
    },
    {
      $project: { category: "$_id", totalAmount: 1, count: 1 },
    }
  );

  return TransactionModel.aggregate(query).exec();
};

export const getMonthGroupTransactions = (year, userId) => {
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);

  const query = [];

  query.push(
    {
      $lookup: {
        from: "task",
        localField: "refTask",
        foreignField: "_id",
        as: "task",
      },
    },
    { $unwind: { path: "$task", preserveNullAndEmptyArrays: false } },

    {
      $lookup: {
        from: "bankAccount",
        localField: "task.refBankAccount",
        foreignField: "_id",
        as: "bankAccount",
      },
    },

    { $unwind: { path: "$bankAccount", preserveNullAndEmptyArrays: false } },

    {
      $match: { "bankAccount.refUser": Types.ObjectId(userId) },
    }
  );

  if (startDate) {
    query.push({
      $match: { transactionDate: { $gte: startDate } },
    });
  }

  if (endDate) {
    query.push({
      $match: { transactionDate: { $lte: endDate } },
    });
  }

  query.push(
    {
      $group: {
        _id: {
          type: "$transactionType",
          month: { $dateToString: { format: "%m", date: "$transactionDate" } },
          year: { $dateToString: { format: "%Y", date: "$transactionDate" } },
        },
        totalAmount: { $sum: "$transactionAmount" },
        count: { $sum: 1 },
      },
    },
    {
      $project: { group: "$_id", totalAmount: 1, count: 1 },
    },

    {
      $group: {
        _id: { month: "$group.month", year: "$group.year" },
        income: {
          $sum: {
            $cond: {
              if: { $eq: ["$group.type", "credit"] },
              then: "$totalAmount",
              else: 0,
            },
          },
        },

        expense: {
          $sum: {
            $cond: {
              if: { $eq: ["$group.type", "debit"] },
              then: "$totalAmount",
              else: 0,
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        orderField: { $concat: ["$_id.year", "$_id.month"] },
        income: 1,
        expense: 1,
        month: {
          $switch: {
            branches: [
              {
                case: { $eq: ["$_id.month", "01"] },
                then: "January",
              },
              {
                case: { $eq: ["$_id.month", "02"] },
                then: "February",
              },
              {
                case: { $eq: ["$_id.month", "03"] },
                then: "March",
              },
              {
                case: { $eq: ["$_id.month", "04"] },
                then: "April",
              },
              {
                case: { $eq: ["$_id.month", "05"] },
                then: "May",
              },
              {
                case: { $eq: ["$_id.month", "06"] },
                then: "June",
              },
              {
                case: { $eq: ["$_id.month", "07"] },
                then: "July",
              },
              {
                case: { $eq: ["$_id.month", "08"] },
                then: "August",
              },
              {
                case: { $eq: ["$_id.month", "09"] },
                then: "September",
              },
              {
                case: { $eq: ["$_id.month", "10"] },
                then: "October",
              },
              {
                case: { $eq: ["$_id.month", "11"] },
                then: "November",
              },
              {
                case: { $eq: ["$_id.month", "12"] },
                then: "December",
              },
            ],
            default: "No Date",
          },
        },
      },
    }
  );

  query.push({ $sort: { orderField: 1 } });

  return TransactionModel.aggregate(query).exec();
};

export const getTransactionById = (transactionId) => {
  return TransactionModel.findById(transactionId).exec();
};

export const getPlaceLabels = (userId) => {
  return PlaceLabelModel.find({ refUser: userId }).exec();
};

export const getPlaceLabelIdByName = (userId, name) => {
  return PlaceLabelModel.findOne({ name: name, refUser: userId }).exec();
};

export const savePlaceLabel = (placeLabel) => {
  const newPlaceLabel = new PlaceLabelModel(placeLabel);
  return newPlaceLabel.save();
};

export const deletePlaceLabel = (placeLabelName) => {
  return PlaceLabelModel.findOneAndDelete({ name: placeLabelName }).exec();
};

export const deleteLocationForTransaction = async (transactionId) => {
  const transactionModel = await TransactionModel.findOne({
    _id: transactionId,
  }).exec();
  transactionModel.refPlaceLabel = null;
  transactionModel.save();
};

export const locationTotalAmount = (userId) => {
  const query = [];

  query.push(
    {
      $match: { transactionType: "debit" },
    },
    {
      $match: { refPlaceLabel: { $exists: true } },
    },

    {
      $match: { $expr: { $ne: ["$refPlaceLabel", null] } },
    },
    {
      $lookup: {
        from: "task",
        localField: "refTask",
        foreignField: "_id",
        as: "task",
      },
    },
    { $unwind: { path: "$task", preserveNullAndEmptyArrays: false } },

    {
      $lookup: {
        from: "bankAccount",
        localField: "task.refBankAccount",
        foreignField: "_id",
        as: "bankAccount",
      },
    },

    { $unwind: { path: "$bankAccount", preserveNullAndEmptyArrays: false } },

    {
      $match: { "bankAccount.refUser": Types.ObjectId(userId) },
    },

    {
      $group: {
        _id: {
          label: "$refPlaceLabel.name",
          location: "$refPlaceLabel.location",
          currency: "$bankAccount.currency",
        },
        totalAmount: { $sum: "$transactionAmount" },
      },
    },
    {
      $project: {
        label: "$_id.label",
        location: "$_id.location",
        totalAmount: 1,
        currency: {
          $switch: {
            branches: [
              {
                case: { $eq: ["$_id.currency", "GBP"] },
                then: "£",
              },
              {
                case: { $eq: ["$_id.currency", "USD"] },
                then: " $",
              },
              {
                case: { $eq: ["$_id.currency", "EUR"] },
                then: " €",
              },
            ],
            default: "NC",
          },
        },
        _id: 0,
      },
    }
  );

  return TransactionModel.aggregate(query).exec();
};
