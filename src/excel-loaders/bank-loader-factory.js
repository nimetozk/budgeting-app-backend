
import loader_LL from "./llyods-bank-loader";
import loader_HSBC from "./hsbc-bank-loader";

const getLoader = (bankName) => {
    switch (bankName) {
        case "LLOYDS":
            return loader_LL;
            
        case "HSBC": 
            return loader_HSBC;
    
        default:
            break;
    }
}


export default getLoader;