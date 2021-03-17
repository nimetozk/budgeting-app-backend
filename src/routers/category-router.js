import express, { Router } from "express";
import CategoryModel from "../schemas/category-schema";
import authorize from "../middleware/authorize";
import * as categoryRepository from "../repositories/category-repository";
import { wrapFunction } from "../util";

const router = Router();

const postCategory = async (req, res, next) => {
  const category = new CategoryModel();
  category.interClassCode = req.body.interClassCode;
  category.categoryDesc = req.body.categoryDesc;
  const newcategory = await category.save();

  res.json(newcategory);
};

router.post("/category", authorize, wrapFunction(postCategory));

const categoryList = async (req, res) => {
  const categoryList = await categoryRepository.getCategoryList();
  res.status(200).json(categoryList);
};

router.get("/category/list", authorize, wrapFunction(categoryList));

export default router;
