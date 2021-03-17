import express, { Router } from "express";
import BankAccountModel from "../schemas/bank-account-schema";
import * as bankAccountRepository from "../repositories/bank-account-repository";
import { StatusCodes } from "http-status-codes";
import authorize from "../middleware/authorize";
import { wrapFunction } from "../util";

const router = Router();

const postBankAccount = async (req, res, next) => {
  const bankAccount = new BankAccountModel();
  bankAccount.accountNo = req.body.accountNo;
  bankAccount.sortCode = req.body.sortCode;
  bankAccount.description = req.body.description;
  bankAccount.currency = req.body.currency;
  bankAccount.country = req.body.country;
  bankAccount.refBank = req.body.refBank;
  bankAccount.refUser = req.current.id;
  const newBankAccount = await bankAccount.save();

  res.json(newBankAccount);
};

router.post("/bankaccount", authorize, wrapFunction(postBankAccount));

const bankAccountByUser = async (req, res) => {
  const userBankAccounts = await bankAccountRepository.getBankAccountsByUser(
    req.current.id
  );
  res.status(StatusCodes.OK).json(userBankAccounts);
};

router.get(
  "/bankaccount/useraccounts",
  authorize,
  wrapFunction(bankAccountByUser)
);

const deleteBankAccount = async (req, res) => {
  const ok = await bankAccountRepository.existTasksByRefBankAccount(
    req.params.id
  );
  if (ok) {
    res
      .status(500)
      .send(
        "This cannot be deleted because there an record relationship with task !"
      );
    return;
  }
  const deleteAccount = await bankAccountRepository.getDeleteBankAccountById(
    req.params.id
  );

  res.status(StatusCodes.OK).json(deleteAccount);
};

router.delete("/bankaccount/:id", authorize, deleteBankAccount);

const currentUserBankAccounts = async (req, res) => {
  const userBankAccounts = await bankAccountRepository.getCurrentUserBankAccounts(
    req.current.id,
    req.params.bankId
  );
  res.status(StatusCodes.OK).json(userBankAccounts);
};
router.get(
  `/bankaccount/getcurrentuserbankaccounts/:bankId`,
  authorize,
  wrapFunction(currentUserBankAccounts)
);

export default router;
