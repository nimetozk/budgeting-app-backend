import CategoryModel from "../schemas/category-schema";


export const  getWordCategoryId =  async (word)=>{

    return CategoryModel.findOne({ words: word}).select("_id name").exec();
}

export const getGeneralCategory = async() =>{

    return CategoryModel.findOne({name:"GENERAL"}).select("_id name").exec();
}