/**
 * Analyses the bank statement of the 'LLoyds' bank
 * Identifies each transaction by splitting the file into lines and cells.
 * Then assigns a category to the transaction.
 *
 */

import { assignCategories, Result, IsnullOrEmpty } from "../util";
import TransactionModel from "../schemas/transaction-schema";
import { Types } from "mongoose";

/* istanbul ignore next */
const validateDate = (date) => {
  if (IsnullOrEmpty(date)) {
    return null;
  }

  let dateParts = date.split("/");
  const formatDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  return new Date(formatDate);
};

/* istanbul ignore next */
const loader = async (buffer, taskId) => {
  const allLines = buffer.toString().split(/(?:\r\n|\r|\n)/g);
  if (!allLines || !allLines.length || allLines.length <= 1) {
    let res = new Result();
    res.isError = true;
    res.message = "A problem occurred !";
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
    transaction.description = lineCells[4];

    if (!IsnullOrEmpty(lineCells[5])) {
      transaction.transactionAmount = lineCells[5];
      transaction.transactionType = "debit";
    } else {
      transaction.transactionAmount = lineCells[6];
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
