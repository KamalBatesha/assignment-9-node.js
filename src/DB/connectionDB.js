import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const dbName = "assigment9";
const client = new MongoClient(url);
export const db=client.db(dbName);

export const checkDBconnection = () => {
  client
    .connect()
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
    });
};
