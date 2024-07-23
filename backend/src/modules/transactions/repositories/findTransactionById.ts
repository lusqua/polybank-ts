import { Collection, ObjectId } from "mongodb";
import { database } from "../../../config/mongo";
import { config } from "../../../config";

export const findTransactionByIdRepository = async (
  id: string,
  transactions: Collection = database.collection(
    config.collections.transactions
  )
) => {
  const transaction = await transactions.findOne({
    _id: new ObjectId(id),
  });

  if (!transaction) return null;

  const { _id, account, targetAccount, amount, code, createdAt } = transaction;

  return {
    _id: _id.toHexString(),
    account,
    targetAccount,
    amount,
    code,
    createdAt,
  };
};
