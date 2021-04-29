import { describe, expect, test, jest, it } from "@jest/globals";
import * as userRepository from "../src/repositories/user-repository";
import { Types } from "mongoose";

describe("User", () => {
  it("Get User Credentails", async () => {
    expect.assertions(1);
    await userRepository
      .getUserByCredential("nimetozakca@gmail.com")
      .then((res) => {
        expect(res).toBeDefined();
      });
  });

  it("Get User By Email", async () => {
    expect.assertions(1);
    await userRepository.getUserByEmail("admin@money.com").then((res) => {
      expect(res).toBeDefined();
    });
  });

  it("Get User List", async () => {
    expect.assertions(1);
    await userRepository.getUserList().then((res) => {
      expect(res).toBeDefined();
    });
  });

  it("Get User By Id", async () => {
    expect.assertions(1);
    await userRepository
      .getUserById(Types.ObjectId("604d76b18a2cd94bd0ee8be9"))
      .then((res) => {
        expect(res).toBeDefined();
      });
  });

  it("Delete User By Id", async () => {
    expect.assertions(1);
    await userRepository
      .getDeleteUserById(Types.ObjectId("608a115c2942f80036640c16"))
      .then((res) => {
        expect(res).toBeUndefined();
      });
  });
});
