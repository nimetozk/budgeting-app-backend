 import * as categoryRepository from "../repositories/category-repository";

export class Result {
  isError = false;
  value = null;
  message =  "";
}


export const IsnullOrEmpty = (value) =>{

     if(typeof value !== "string") {
         return !Boolean(value);
     }
      
     if(!value || !((value.trim()).length))
       return true;     
       
     return false;

}

export const assignCategories = async(desc="") => {

      if(IsnullOrEmpty(desc)) {
          return await categoryRepository.getGeneralCategory();;
      }

     let newArray = desc.split(" ");  
     let category = null;
     newArray
      .filter((word)=> word.length > 3);


    for (const word of newArray) {
      category = await categoryRepository.getWordCategoryId(word.toLowerCase());
        if(category) 
            break;
    }

    if(!category)
      category = await categoryRepository.getGeneralCategory();

      return category;

}

