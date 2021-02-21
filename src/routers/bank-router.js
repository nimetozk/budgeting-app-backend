import express, { Router } from "express";
import BankModel from "../schemas/bank-schema";
import * as bankRepository from "../repositories/bank-repository";
import { StatusCodes } from "http-status-codes";
import authorize from "../middleware/authorize";

const router = Router();

router.post(
  "/bank",
  authorize,

  async (req, res, next) => {
    const bank = new BankModel();
    bank.name = req.body.name;

    const newBank = await bankRepository.InsertBank(bank);

    res.json(newBank);
  }
);

router.get("/bank/list", authorize, async (req, res, next) => {
  const bankList = await bankRepository.bankList();
  res.json(bankList);
});

router.get("/bank/:id", authorize, async (req, res, next) => {
  const bank = await bankRepository.getBankById(req.params.id);

  if (!bank) {
    res.status(StatusCodes.NOT_FOUND).json("bank is not found !");
    return;
  }
  res.status(StatusCodes.OK).json(bank);
});

export default router;
