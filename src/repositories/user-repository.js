import UserModel from "../schemas/user-schema";
import mongoose from "mongoose";

export const InsertUser = async(user) =>{
    const newUser = await user.save();
    return newUser;
}

export const getUserByCredential = (email, password) =>{
     return UserModel.findOne({email:email,password:password }).lean(false).exec();
}

export const getUserByEmail = (email) => {
    return UserModel.findOne({email:email}).lean(false).exec();
}