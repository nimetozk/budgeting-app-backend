import config from "../config";
import express, { Router } from "express";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user-repository";
import validator from "validator";
import { StatusCodes } from "http-status-codes";
import UserModel from "../schemas/user-schema";

const router = Router();

router.post("/auth/signup", async (req, res) => {
  let user = new UserModel();
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.password = req.body.password;
  user.phoneNumber = req.body.phoneNumber;

  if (validator.isEmpty(user.email) || validator.isEmpty(user.password)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json("You must enter email and password ! ");

    return;
  }

  if (!validator.isEmail(user.email)) {
    res.status(StatusCodes.BAD_REQUEST).json("Email is invalid !");
    return;
  }

  const userInDB = await userRepository.getUserByEmail(user.email);
  if (userInDB) {
    res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json("This email was defined before for another user !");
    return;
  }

  user = await userRepository.InsertUser(user);
  const token = jwt.sign({ email: user.email, id: user._id }, config.jwtKey);
  res.status(StatusCodes.OK).json({ token });
});

router.post("/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  if (validator.isEmpty(email) || validator.isEmpty(password)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json("You must enter email and password ! ");
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(StatusCodes.BAD_REQUEST).json("Email is invalid format !");
    return;
  }

  const user = await userRepository.getUserByCredential(email, password);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND);
    return;
  }

  const token = jwt.sign({ email: user.email, id: user._id }, config.jwtKey);
  res.status(200).json({ token });
});

export default router;
