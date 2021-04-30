import express, { Router } from "express";
import BankModel from "../schemas/bank-schema";
import * as bankRepository from "../repositories/bank-repository";
import { StatusCodes } from "http-status-codes";
import authorize from "../middleware/authorize";
import { wrapFunction } from "../util";

const router = Router();

const postBank = async (req, res, next) => {
  const bank = new BankModel();
  bank.name = req.body.name;

  const newBank = await bankRepository.InsertBank(bank);

  res.json(newBank);
};

router.post("/bank", authorize, wrapFunction(postBank));

const bankList = async (req, res, next) => {
  const bankList = await bankRepository.bankList();
  res.json(bankList);
};

router.get("/bank/list", authorize, wrapFunction(bankList));

const bankById = async (req, res, next) => {
  const bank = await bankRepository.getBankById(req.params.id);

  if (!bank) {
    res.status(StatusCodes.NOT_FOUND).json("Bank not found !");
    return;
  }
  res.status(StatusCodes.OK).json(bank);
};

router.get("/bank/:id", authorize, wrapFunction(bankById));

const updatedBank = async (req, res) => {
  const bank = await bankRepository.updateBank(req.body);

  res.status(StatusCodes.OK).json(bank);
};

router.put("/bank", authorize, wrapFunction(updatedBank));

export default router;
