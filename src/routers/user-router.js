import express,{Router} from "express";
import UserModel from "../schemas/user-schema";
import * as userRepository from "../repositories/user-repository";

const router = Router();

router.post('/user',
        
   async (req, res, next) =>{ 

    const user = new UserModel();
    user.firstname = req.body.firstname;
    user.lastname=req.body.lastname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phoneNumber = req.body.phoneNumber;
  
    const newUser = await userRepository.InsertUser(user);

    res.json(newUser);
});


export default router;
