import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo;

beforeAll(async () => {
  console.log("mongo db calısıyor");
  // set env variables
  //process.env.JWT_KEY = "agaewgg3";

  // we use Mongo memory server to run instances of mongodb in memory - allows us to direct access to db and each test suit can have its own db
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  console.log("mongoUri", mongoUri);
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
  });

  console.log("state mongo :", mongoose.connection.readyState);
});

/*
beforeEach(async () => {
  // clear data before each test
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
*/

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
