/**
 * Transaction router responds to the client requests which are related to the user transactions.
 *
 * To understand the Express.js library, I have used the following website and books:
 * https://expressjs.com/en/guide/routing.html
 *
 * Wilson, E. (2018). MERN Quick Start Guide, Building Web applications with MongoDB, Express.js, React, and Node. Birmingham: Packt Publishing.
 * Subramanian, V.(2019). Pro MERN Stack. Bangalore: Apress.
 *
 */

import express, { Router } from "express";
import { Types } from "mongoose";
import { uploadTsvHandler } from "../middleware/file-upload-middleware";
import TransactionModel from "../schemas/transaction-schema";
import getLoader from "../excel-loaders/bank-loader-factory";
import * as taskRepository from "../repositories/task-repository";
import * as transactionsRepository from "../repositories/transaction-repository";
import authorize from "../middleware/authorize";
import TaskModel from "../schemas/task-schema";
import { wrapFunction } from "../util";
import { StatusCodes } from "http-status-codes";

const router = Router();

const addTransaction = async (req, res, next) => {
  const transaction = new TransactionModel();
  transaction.transactionDate = req.body.transactionDate;
  transaction.transactionType = req.body.transactionType;
  transaction.transactionAmount = req.body.transactionAmount;
  transaction.externalCode = req.body.externalCode;
  transaction.description = req.body.description;
  transaction.refCategory = req.body.refCategory;
  transaction.refTask = Types.ObjectId(req.body.refTask);
  const newTransaction = await transaction.save();

  res.json(newTransaction);
};

router.post("/transaction", authorize, wrapFunction(addTransaction));

const saveTransactions = async (req, res, next) => {
  const bankName = await taskRepository.getBankNameByTaskId(
    Types.ObjectId(req.params.taskId)
  );
  const loader = getLoader(bankName);
  const result = await loader(req.file.buffer, req.params.taskId);

  if (result.isError) {
    res.status(404).json(result.message);
    return;
  }
  const transactions = result.value;

  await transactionsRepository.saveAllTransactions(transactions);

  const taskModel = await TaskModel.findById(req.params.taskId).exec();
  taskModel.uploadDate = new Date();
  taskModel.fileName = req.file.fileName;
  taskModel.status = "COMPLETED";
  await taskModel.save();

  res.json("ok");
};

router.post(
  "/transaction/upload/:taskId",
  authorize,
  uploadTsvHandler,
  wrapFunction(saveTransactions)
);

const transactionByTaskId = async (req, res) => {
  const transactions = await transactionsRepository.getTransactionsByTaskId(
    req.params.taskId
  );

  res.status(200).json(transactions);
};

router.get(
  "/transaction/task/:taskId",
  authorize,
  wrapFunction(transactionByTaskId)
);

const partialUpdate = async (req, res) => {
  await transactionsRepository.partialUpdate(req.body, req.params.id);
  res.status(200).json("ok");
};

router.patch("/transaction/:id", authorize, wrapFunction(partialUpdate));

const categoryGroupTransactions = async (req, res) => {
  const { income, bankId, startDate, endDate } = req.query;

  const data = await transactionsRepository.getCategoryGroupTransactions(
    income === "true" ? true : false,
    bankId,
    startDate,
    endDate,
    req.current.id
  );
  res.status(200).json(data);
};

router.get(
  "/transaction/reportByCategory",
  authorize,
  wrapFunction(categoryGroupTransactions)
);

const monthGroupTransactions = async (req, res) => {
  const { year } = req.query;

  const data = await transactionsRepository.getMonthGroupTransactions(
    year,
    req.current.id
  );
  res.status(200).json(data);
};

router.get("/transaction/reportByMonth", authorize, monthGroupTransactions);

const transactionBykId = async (req, res) => {
  const transaction = await transactionsRepository.getTransactionById(
    req.params.transactionId
  );

  res.status(200).json(transaction);
};

router.get(
  "/transaction/:transactionId",
  authorize,
  wrapFunction(transactionBykId)
);

const getPlaceLabels = async (req, res) => {
  const placeLabels = await transactionsRepository.getPlaceLabels(
    req.current.id
  );
  res.status(200).json(placeLabels);
};

router.get("/placeLabel", authorize, wrapFunction(getPlaceLabels));

const savePlaceLabel = async (req, res) => {
  const placeLabelinDB = await transactionsRepository.getPlaceLabelIdByName(
    req.current.id,
    req.body.name
  );

  if (placeLabelinDB) {
    placeLabelinDB.name = req.body.name;
    placeLabelinDB.location = req.body.location;
    await placeLabelinDB.save();
    res.status(StatusCodes.OK).json(placeLabelinDB._id);
    return;
  }

  const placeLabel = {
    name: req.body.name,
    refUser: req.current.id,
    location: req.body.location,
  };

  const newLabel = await transactionsRepository.savePlaceLabel(placeLabel);
  res.status(StatusCodes.OK).json(newLabel._id);
};

router.post("/placeLabel", authorize, wrapFunction(savePlaceLabel));

const getDeletePlaceLabel = async (req, res) => {
  const deletePlaceLabel = await transactionsRepository.deletePlaceLabel(
    req.params.placeLabel
  );

  res.status(StatusCodes.OK).json(deletePlaceLabel);
};

router.delete(
  "/placeLabel/:placeLabel",
  authorize,
  wrapFunction(getDeletePlaceLabel)
);

const deleteLocationForTransaction = async (req, res) => {
  const deletedTransaction = await transactionsRepository.deleteLocationForTransaction(
    req.params.transactionId
  );

  res.status(StatusCodes.OK).json(deletedTransaction);
};

router.delete(
  "/transaction/:transactionId",
  authorize,
  wrapFunction(deleteLocationForTransaction)
);

const getLocationTotalAmount = async (req, res) => {
  const locationTotalAmount = await transactionsRepository.locationTotalAmount(
    req.current.id
  );

  res.status(StatusCodes.OK).json(locationTotalAmount);
};

router.get(
  "/transaction/groupBy/location",
  authorize,
  wrapFunction(getLocationTotalAmount)
);

export default router;
