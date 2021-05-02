//Mitigrates admin account

import mongoose from "mongoose";
import MigrationHistoryModel from "../schemas/migration-history-schema";
import UserModel, { Roles } from "../schemas/user-schema";
import { hashPassword } from "../util";

const migrate1 = (handleNext) => {
  return {
    name: "migration1",
    next: handleNext,
    execute: async () => {
      const userModel = new UserModel();
      userModel.firstname = "admin";
      userModel.lastname = "admin";
      userModel.email = "admin@money.com";
      userModel.password = await hashPassword("12345678");
      userModel.phoneNumber = "";
      userModel.userRoles = [Roles.ADMIN];

      await userModel.save();
    },
  };
};

/*
const migrate2 = (handleNext) => {
    return {
      name: "migration2",
      next: handleNext,
      execute: async () => {
      },
    };
  };

  const migrate3 = (handleNext) => {
    return {
      name: "migration3",
      next: handleNext,
      execute: async () => {
      },
    };
  };
*/

const migrationLoader = async () => {
  // const migration3 = migrate3(null);
  //const migration2 = migrate2(migrate3);
  // const migration1 = migrate1(migration2);
  const migration1 = migrate1(null);
  let migration = migration1;

  do {
    const mhistory = await MigrationHistoryModel.findOne({
      name: migration.name,
    }).exec();

    if (!mhistory) {
      await migration.execute();
      const newHistory = new MigrationHistoryModel();
      newHistory.name = migration.name;
      await newHistory.save();
    }

    migration = migration.next;
  } while (migration);
};

export default migrationLoader;
