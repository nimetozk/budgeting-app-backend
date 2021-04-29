import { describe, expect, test, jest, it } from "@jest/globals";
import * as taskRepository from "../src/repositories/task-repository";
import { Types } from "mongoose";

describe("Task", () => {
  //   it("Get Bank Name By Task Id", async () => {
  //     await taskRepository
  //       .getBankNameByTaskId(Types.ObjectId("60690bde06886500369a2d9d"))
  //       .then((res) => {
  //         expect(res).toBeDefined();
  //       });
  //   });

  it("Get Task List by User Id", async () => {
    await taskRepository
      .taskList(Types.ObjectId("605047a3a7fdfa4338331d9e"))
      .then((res) => {
        expect(res).toBeDefined();
      });
  });

  it("Get Task Id", async () => {
    await taskRepository
      .getTaskById(Types.ObjectId("60690bde06886500369a2d9d"))
      .then((res) => {
        expect(res).toBeDefined();
      });
  });
});
