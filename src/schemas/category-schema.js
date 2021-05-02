/**
 * Defines the dynamic schema for 'category' documents stored in the database.
 *
 * This is the guide I followed: https://mongoosejs.com/docs/guide.html
 */

import mongoose, { Schema } from "mongoose";

export const categorySchema = new Schema({
  interClassCode: String,
  name: String,
  words: { types: [] },
});

const CategoryModel = mongoose.model("category", categorySchema, "category");

export default CategoryModel;
