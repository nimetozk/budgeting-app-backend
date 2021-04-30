import express, { Router } from "express";
import UserModel, { Roles } from "../schemas/user-schema";
import * as userRepository from "../repositories/user-repository";
import authorize from "../middleware/authorize";
import { StatusCodes } from "http-status-codes";
import { hashPassword, wrapFunction } from "../util";
import * as bankAccountRepository from "../repositories/bank-account-repository";

const router = Router();

const insertedUser = async (req, res, next) => {
  const user = new UserModel();
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.password = req.body.password;
  user.phoneNumber = req.body.phoneNumber;
  user.userRoles = [Roles.OPERATOR];

  const newUser = await userRepository.InsertUser(user);

  res.json(newUser);
};

router.post("/user", wrapFunction(insertedUser));

const userByEmail = async (req, res) => {
  const user = await userRepository.getUserByEmail(req.current.email);
  res.status(StatusCodes.OK).json(user);
};

router.get("/user/current", authorize, wrapFunction(userByEmail));

const updatedUser = async (req, res) => {
  const user = { ...req.body };

  const userInDB = await UserModel.findById(user._id).exec();

  if (userInDB.password !== user.password) {
    user.password = await hashPassword(user.password);
  }

  const updatedUser = await userRepository.updateUser(user);
  res.status(200).json(updatedUser);
};

router.put("/user", authorize, wrapFunction(updatedUser));

const userList = async (req, res, next) => {
  const userList = await userRepository.getUserList();
  res.json(userList);
};

router.get("/user/list", authorize, wrapFunction(userList));

const userById = async (req, res, next) => {
  const user = await userRepository.getUserById(req.params.id);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json("User not found !");
    return;
  }
  res.status(StatusCodes.OK).json(user);
};

router.get("/user/:id", authorize, wrapFunction(userById));

const deletedUserById = async (req, res) => {
  const hasAccount = await bankAccountRepository.hasUserBankAccounts(
    req.params.id
  );
  if (hasAccount) {
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send(
        "This user cannot be deleted since it has a relationship with a bank account"
      );
    return;
  }
  const deleteUser = await userRepository.getDeleteUserById(req.params.id);

  res.status(StatusCodes.OK).json(deleteUser);
};

router.delete("/user/:id", authorize, wrapFunction(deletedUserById));

export default router;
