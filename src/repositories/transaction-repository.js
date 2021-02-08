

export const saveAllTransactions = async(transactions) =>{

   const arrayPromises = [];

   transactions.forEach(async(transaction) => {
      arrayPromises.push(transaction.save());
   });
 
   await Promise.all(arrayPromises);
 }