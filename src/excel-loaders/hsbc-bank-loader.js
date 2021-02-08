import { Result } from "../util";


const loader = async (buffer, taskId)=>{

    const allLines = buffer.toString().split(/(?:\r\n|\r|\n)/g); // we are taking row by row
    if (!allLines || !allLines.length || allLines.length <= 1) {
        
        let res = new Result();
        res.isError = true;
        res.message = "problem var";
        return res;
  }
             

    const trans = [];
    for (let i = 1; i < allLines.length; i += 1) {
        const lineCells = allLines[i].split(/(?:\t)/g); // split according to tab character "\t"

        const transaction = new TransactionModel();
        transaction.refTask = Types.ObjectId(taskId);
        transaction.transactionDate = lineCells[0];
        transaction.externalCode = lineCells[1];
        transaction.reference = lineCells[2];

        let cellAmount = lineCells[3];

        if(cellAmount.includes("-")){
            let cellClean = cellAmount.split("-£");
            cellClean.shift();
            transaction.transactionAmount = cellClean;
            transaction.transactionType = "debit";
        } else{
            let cellClean = cellAmount.split("£");
            cellClean.shift();
            transaction.transactionAmount = cellClean;
            transaction.transactionType = "credit";
        }
        transaction.taskId.refBankAccount.bankName = "HSBC" //bankName
        transaction.refCategory = Types.ObjectId(refCategory); // refCategory: categorySchema
        // transaction.taskId.refBankAccount.sortCode = ; //sort code
        // transaction.taskId.refBankAccount.accountNo =;  //acc no
        
        //transaction currency == account currency 

        const newTransaction = await transaction.save();

        trans.push(transaction);

    }

    let res = new Result();
    res.isError = false;
    res.value = trans;
    return res;

}



export default loader;