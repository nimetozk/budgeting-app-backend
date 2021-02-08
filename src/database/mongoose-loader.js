import config from "../config";
import mongoose, { mongo } from "mongoose";


const DbLoader = async() =>{

     await mongoose.connect(config.databaseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
  
      if(mongoose.connection.readyState  === 1) {
        console.log("mongo connected");
    } else
        console.log("Disconnected");
}


export default DbLoader;