import express,{Router} from "express";
import CategoryModel from "../schemas/category-schema";

const router = Router();

router.post('/category',
        
   async (req, res, next) =>{ 

    const category = new CategoryModel();
    category.interClassCode = req.body.interClassCode;
    category.categoryDesc = req.body.categoryDesc;
    const newcategory = await category.save();

     res.json(newcategory);
});

export default router;
