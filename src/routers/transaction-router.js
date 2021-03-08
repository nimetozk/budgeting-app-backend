import express, { Router } from "express";
import { Types } from "mongoose";
import { uploadTsvHandler } from "../middleware/file-upload-middleware";
import TransactionModel from "../schemas/transaction-schema";
import getLoader from "../excel-loaders/bank-loader-factory";
import * as taskRepository from "../repositories/task-repository";
import * as transactionsRepository from "../repositories/transaction-repository";
import authorize from "../middleware/authorize";
import TaskModel from "../schemas/task-schema";

const router = Router();

router.post(
  "/transaction",
  authorize,

  async (req, res, next) => {
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
  }
);

router.post(
  "/transaction/upload/:taskId",
  authorize,
  uploadTsvHandler,
  async (req, res, next) => {
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
  }
);

router.get("/transaction/task/:taskId", authorize, async (req, res) => {
  const transactions = await transactionsRepository.getTransactionsByTaskId(
    req.params.taskId
  );

  res.status(200).json(transactions);
});

router.patch("/transaction/:id", authorize, async (req, res) => {
  await transactionsRepository.partialUpdate(req.body, req.params.id);
  res.status(200).json("ok");
});

router.get("/transaction/reportByCategory", authorize, async (req, res) => {
  const { income, bankId, startDate, endDate } = req.query;

  const data = await transactionsRepository.getCategoryGroupTransactions(
    income === "true" ? true : false,
    bankId,
    startDate,
    endDate,
    req.current.id
  );
  res.status(200).json(data);
});

router.get("/transaction/reportByMonth", authorize, async (req, res) => {
  const { year } = req.query;

  const data = await transactionsRepository.getMonthGroupTransactions(
    year,
    req.current.id
  );
  res.status(200).json(data);
});
export default router;
