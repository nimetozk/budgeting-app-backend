import bodyParser from "body-parser";
import express from "express";
import config from "./config";
import DbLoader from "./database/mongoose-loader";
import userRouter from "./routers/user-router";
import transactionRouter from "./routers/transaction-router";
import bankAccountRouter from "./routers/bank-account-router";
import categoryRouter from "./routers/category-router";
import taskRouter from "./routers/task-router";
import authRouter from "./routers/auth-router";
import bankRouter from "./routers/bank-router";
import cors from "cors";
import migrationLoader from "./migration/migrationLoader";
import { errorToString } from "./util";

const startServer = async () => {
  await DbLoader();
  await migrationLoader();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.use("/api", userRouter);
  app.use("/api", transactionRouter);
  app.use("/api", bankAccountRouter);
  app.use("/api", categoryRouter);
  app.use("/api", taskRouter);
  app.use("/api", authRouter);
  app.use("/api", bankRouter);
  app.use((err, req, res, next) => {
    //  console.log(err);
    res.status(500).send("error :" + errorToString(err));
  });

  app.listen(config.port, function () {
    console.log(`Server started listening on ${config.port}`);
  });
};

startServer();
