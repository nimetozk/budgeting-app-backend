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
import cors from "cors";

const startServer = async () => {
  await DbLoader();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.use("/api", userRouter);
  app.use("/api", transactionRouter);
  app.use("/api", bankAccountRouter);
  app.use("/api", categoryRouter);
  app.use("/api", taskRouter);
  app.use("/api", authRouter);

  app.listen(config.port, function () {
    console.log(`Server started listening on ${config.port}`);
  });
};

startServer();
