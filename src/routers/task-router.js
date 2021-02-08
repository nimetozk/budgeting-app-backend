import express,{Router} from "express";
import { Types } from "mongoose";
import TaskModel from "../schemas/task-schema";

const router = Router();

router.post('/task',
        
   async (req, res, next) =>{ 

    const task = new TaskModel();
    task.name = req.body.name;
    task.uploadDate = new Date();
    task.fileName = req.body.fileName;
    task.status = "PENDING";
    task.refBankAccount = Types.ObjectId(req.body.refBankAccount);
    const newTask = await task.save();

     res.json(newTask);
});

router.post('/task/:taskId',(req,res)=>{

});

export default router;
