import express, { Router } from "express";
import UserModel from "../schemas/user-schema";
import * as userRepository from "../repositories/user-repository";
import authorize from "../middleware/authorize";
import { StatusCodes } from "http-status-codes";
import authorize from "../middleware/authorize";

const router = Router();

router.post(
  "/user",
  // authorize gerekiyor mu?

  async (req, res, next) => {
    const user = new UserModel();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phoneNumber = req.body.phoneNumber;

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
  const updatedUser = await userRepository.updateUser(user);

  res.json(updatedUser);
});

export default router;
