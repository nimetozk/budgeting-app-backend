/**
 * Category repository encapslates the logic required to access the 'Category' collection in the database.
 */

import CategoryModel from "../schemas/category-schema";

/* istanbul ignore next */
export const getWordCategoryId = (word) => {
  return CategoryModel.findOne({ words: word }).select("_id name").exec();
};

export const getGeneralCategory = () => {
  return CategoryModel.findOne({ name: "GENERAL" }).select("_id name").exec();
};

export const getCategoryList = () => {
  return CategoryModel.find().select("_id name").exec();
};

export const insertCategory = (name, code) => {
  const category = new CategoryModel();

  category.name = name;
  category.code = code;
  return category.save();
};
