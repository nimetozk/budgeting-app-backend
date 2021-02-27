import express, { Router } from "express";
import CategoryModel from "../schemas/category-schema";
import authorize from "../middleware/authorize";
import * as categoryRepository from "../repositories/category-repository";

const router = Router();

router.post(
  "/category",
  authorize,

  async (req, res, next) => {
    const category = new CategoryModel();
    category.interClassCode = req.body.interClassCode;
    category.categoryDesc = req.body.categoryDesc;
    const newcategory = await category.save();

    res.json(newcategory);
  }
);

router.get("/category/list", authorize, async (req, res) => {
  const categoryList = await categoryRepository.getCategoryList();
  res.status(200).json(categoryList);
});

export default router;
