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
    task.status = "PENDING";
    task.refBankAccount = Types.ObjectId(req.body.refBankAccount);
    const newTask = await task.save();

    res.status(StatusCodes.OK).json(newTask);
  }
);

router.put(
  "/task/:id",
  authorize,

  async (req, res, next) => {
    let task = await TaskModel.findById({ _id: req.params.id }).exec();
    task.name = req.body.name;
    task.refBankAccount = Types.ObjectId(req.body.refBankAccount);
    task = await task.save();

    res.status(StatusCodes.OK).json(task);
  }
);

router.get("/task/:id", authorize, async (req, res) => {
  const task = await taskRepository.getTaskById(req.params.id);
  res.status(StatusCodes.OK).json(task);
});

router.get("/task", authorize, async (req, res) => {
  const list = await taskRepository.taskList(req.current.id);
  res.status(StatusCodes.OK).json(list);
});

export default router;
