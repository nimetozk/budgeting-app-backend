import express, { Router } from "express";
import UserModel, { Roles } from "../schemas/user-schema";
import * as userRepository from "../repositories/user-repository";
import authorize from "../middleware/authorize";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../util";

const router = Router();

router.post(
  "/user",

  async (req, res, next) => {
    const user = new UserModel();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phoneNumber = req.body.phoneNumber;
    user.userRoles = [Roles.OPERATOR];

    const newUser = await userRepository.InsertUser(user);

    res.json(newUser);
  }
);

router.get("/user/current", authorize, async (req, res) => {
  const user = await userRepository.getUserByEmail(req.current.email);
  res.status(StatusCodes.OK).json(user);
});

router.put("/user", authorize, async (req, res, next) => {
  const user = { ...req.body };

  const userInDB = UserModel.findById(user._id).exec();
  if (userInDB.password != user.password) {
    user.password = await hashPassword(user.password);
  }

  const updatedUser = await userRepository.updateUser(user);

  res.json(updatedUser);
});

router.get("/user/list", authorize, async (req, res, next) => {
  const userList = await userRepository.getUserList();
  res.json(userList);
});

router.get("/user/:id", authorize, async (req, res, next) => {
  const user = await userRepository.getUserById(req.params.id);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json("user is not found !");
    return;
  }
  res.status(StatusCodes.OK).json(user);
});

router.delete("/user/:id", authorize, async (req, res) => {
  const deleteUser = await userRepository.getDeleteUserById(req.params.id);

  res.status(StatusCodes.OK).json(deleteUser);
});

export default router;
