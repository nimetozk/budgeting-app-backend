import loader_LL from "./llyods-bank-loader";
import loader_HSBC from "./hsbc-bank-loader";

//Identifies the format of the bank statement according and calls the function to analyse the bank statement

const getLoader = (bankName) => {
  switch (bankName) {
    case "LLoyds Bank":
      return loader_LL;

    case "HSBC Bank":
      return loader_HSBC;

    default:
      break;
  }
};

export default getLoader;
