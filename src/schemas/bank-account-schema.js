import mongoose, {Schema, Types} from 'mongoose';

export const bankAccountSchema = new Schema({
  accountNo: String,
  sortCode: String,
  accountDesc: String,
  accountCurr: String,
  bankName: String,
  aaccountCountry: String, //Atm, direc debit etc
  refUser :{type:mongoose.Types.ObjectId, ref:"user"}
});

const BankAccountModel = mongoose.model('bankAccount', bankAccountSchema,"bankAccount");

export default BankAccountModel;