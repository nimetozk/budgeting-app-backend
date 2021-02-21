import express, { Router } from "express";
import { Types } from "mongoose";
import TaskModel from "../schemas/task-schema";
import * as taskRepository from "../repositories/task-repository";
import authorize from "../middleware/authorize";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.post(
  "/task",
  authorize,

  async (req, res, next) => {
    const task = new TaskModel();
    task.name = req.body.name;
    task.uploadDate = new Date();
    task.fileName = req.body.fileName;
    task.status = "PENDING";
    task.refBankAccount = Types.ObjectId(req.body.refBankAccount);
    const newTask = await task.save();

    res.json(newTask);
  }
);

router.post("/task/:taskId", authorize, async (req, res) => {});

router.get("/task/list", authorize, async (req, res) => {
  const list = await taskRepository.taskList();
  res.status(StatusCodes.OK).json(list);
});

export default router;
