import { config } from "../../../config";
import { database } from "../../../config/mongo";

type CreateAccount = {
  name: string;
  balance: number;
  email: string;
};

export const createAccountRepository = async (
  account: CreateAccount,
  collection = database.collection(config.collections.accounts)
) => {
  const result = await collection.insertOne(account);

  return result.insertedId.toHexString();
};
