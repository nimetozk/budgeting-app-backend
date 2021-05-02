import config from "../config";
import mongoose, { mongo } from "mongoose";

//Establishes the database connection

const DbLoader = async () => {
  await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  if (mongoose.connection.readyState === 1) {
    console.log("Mongo connected!");
  } else console.log("Disconnected!");
};

export default DbLoader;
