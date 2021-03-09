import UserModel from "../schemas/user-schema";
import mongoose from "mongoose";

export const InsertUser = async (user) => {
  const newUser = await user.save();
  return newUser;
};

export const getUserByCredential = (email) => {
  return UserModel.findOne({ email: email }).lean(false).exec();
};

export const getUserByEmail = (email) => {
  return UserModel.findOne({ email: email }).lean(false).exec();
};

export const updateUser = async (user) => {
  const userIndb = await UserModel.findById(user._id).exec();
  userIndb.firstname = user.firstname;
  userIndb.lastname = user.lastname;
  userIndb.email = user.email;
  userIndb.password = user.password;
  userIndb.phoneNumber = user.phoneNumber;

  await userIndb.save();
  return userIndb;
};

export const getUserList = async () => {
  return UserModel.find({}).lean(false).exec();
};

export const getUserById = (id) => {
  return UserModel.findById({ _id: id }).lean(false).exec();
};

export const getDeleteUserById = async (id) => {
  const user = await UserModel.findByIdAndDelete({
    _id: id,
  }).exec();
};
