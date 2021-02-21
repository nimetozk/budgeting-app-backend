import express, { Router } from "express";
import BankAccountModel from "../schemas/bank-account-schema";
import * as bankAccountRepository from "../repositories/bank-account-repository";
import { StatusCodes } from "http-status-codes";
import authorize from "../middleware/authorize";

const router = Router();

router.post(
  "/bankaccount",
  authorize,

  async (req, res, next) => {
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
  }
);

router.get("/bankaccount/useraccounts", authorize, async (req, res) => {
  const userBankAccounts = await bankAccountRepository.getBankAccountsByUser(
    req.current.id
  );
  res.status(StatusCodes.OK).json(userBankAccounts);
});

router.delete("/bankaccount/:id", authorize, async (req, res) => {
  const deleteAccount = await bankAccountRepository.getDeleteBankAccountById(
    req.params.id
  );

  res.status(StatusCodes.OK).json(deleteAccount);
});

export default router;
