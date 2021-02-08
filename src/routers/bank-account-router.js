import express,{Router} from "express";
import BankAccountModel from "../schemas/bank-account-schema";

const router = Router();

router.post('/bankaccount',
        
   async (req, res, next) =>{ 

    const bankAccount = new BankAccountModel();
    bankAccount.accountNo = req.body.accountNo;
    bankAccount.sortCode = req.body.sortCode;
    bankAccount.accountDesc = req.body.accountDesc;
    bankAccount.accountCurr = req.body.accountCurr;
    bankAccount.aaccountCountry = req.body.aaccountCountry;
    bankAccount.csvFormat = req.body.csvFormat;
    bankAccount.bankName = req.body.bankName;
    const newBankAccount = await bankAccount.save();

    res.json(newBankAccount);
});

export default router;
