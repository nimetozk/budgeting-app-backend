import mongoose, { Schema } from "mongoose";

export const Roles = {
  ADMIN: "ADMIN",
  OPERATOR: "OPERATOR",
};

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: { type: String, required: true },
  password: String,
  phoneNumber: String,
  userRoles: [{ type: String, enum: Object.values(Roles), required: true }],
});

const UserModel = mongoose.model("user", userSchema, "user");

export default UserModel;
