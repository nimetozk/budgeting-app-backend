import loader_LL from "./llyods-bank-loader";
import loader_HSBC from "./hsbc-bank-loader";

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
