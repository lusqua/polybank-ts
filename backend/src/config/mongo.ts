import { MongoClient } from "mongodb";
import { config } from "../config";

const uri = config.mongo.uri;
const databaseName = config.mongo.database;

export const client = new MongoClient(uri);

export const database = client.db(databaseName);

export const connect = async () => {
  await client.connect();
  console.log("Connected to MongoDB");
};
