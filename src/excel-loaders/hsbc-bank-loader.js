import { assignCategories, Result, IsnullOrEmpty } from "../util";
import TransactionModel from "../schemas/transaction-schema";
import { Types } from "mongoose";

const validateDate = (date) => {
  if (IsnullOrEmpty(date)) {
    return null;
  }

  let dateParts = date.split("/");
  const formatDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  return new Date(formatDate);
};

const loader = async (buffer, taskId) => {
  const allLines = buffer.toString().split(/(?:\r\n|\r|\n)/g); // we are taking row by row
  if (!allLines || !allLines.length || allLines.length <= 1) {
    let res = new Result();
    res.isError = true;
    res.message = "problem var";
    return res;
  }

  const trans = [];
  for (let i = 1; i < allLines.length; i += 1) {
    const lineCells = allLines[i].split(/(?:\t)/g);

    if (IsnullOrEmpty(lineCells[0])) continue;
    const transaction = new TransactionModel();
    transaction.refTask = Types.ObjectId(taskId);
    transaction.transactionDate = validateDate(lineCells[0]);
    transaction.externalCode = lineCells[1];
    transaction.description = lineCells[2];

    let cellAmount = lineCells[3];

    if (cellAmount.includes("-")) {
      transaction.transactionAmount = parseFloat(cellAmount.substring(2));
      transaction.transactionType = "debit";
    } else {
      transaction.transactionAmount = parseFloat(cellAmount.substring(1));
      transaction.transactionType = "credit";
    }
    transaction.refCategory = await assignCategories(transaction.description);

    trans.push(transaction);
  }

  let res = new Result();
  res.isError = false;
  res.value = trans;
  return res;
};

export default loader;
