
import BankAccountModel from "../schemas/bank-account-schema";
import TaskModel from "../schemas/task-schema";

export const getBankNameByTaskId = async(taskId) =>{

   const task = await TaskModel.findOne({_id:taskId}).select("_id refBankAccount").exec();
   const bankAccount =await BankAccountModel.findOne({_id:task.refBankAccount}).select("bankName").exec();

   return bankAccount.bankName;
}