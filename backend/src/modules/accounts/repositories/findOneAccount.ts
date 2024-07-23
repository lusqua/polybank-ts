import { ObjectId } from "mongodb";
import { database } from "../../../config/mongo";
import { config } from "../../../config";

export const findOneAccountRepository = async (
  id: string | ObjectId,
  collection = database.collection(config.collections.accounts)
) => {
  const account = await collection.findOne({
    _id: new ObjectId(id),
  });

  if (!account) return null;

  const { _id, name, balance, email } = account;

  return {
    _id: _id.toHexString(),
    name,
    balance,
    email,
  };
};
