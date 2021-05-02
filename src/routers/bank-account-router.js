/**
 * Bank account router responds to the client requests which are related to the user bank accounts.
 *
 * To understand the Express.js library, I have used the following website and books:
 * https://expressjs.com/en/guide/routing.html
 *
 * Wilson, E. (2018). MERN Quick Start Guide, Building Web applications with MongoDB, Express.js, React, and Node. Birmingham: Packt Publishing.
 * Subramanian, V.(2019). Pro MERN Stack. Bangalore: Apress.
 *
 */

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
        "This bank account has a relationship with a task. To delete the account, please contact with the QuickLook Team !"
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

const getBankAccountCurrency = async (req, res) => {
  const bankAccountCurrency = await bankAccountRepository.getUserBankAccountCurrency(
    req.params.bankAccount
  );

  res.status(StatusCodes.OK).json(bankAccountCurrency);
};

router.get(
  `/bankaccount/currency/:bankAccount`,
  authorize,
  wrapFunction(getBankAccountCurrency)
);

export default router;
