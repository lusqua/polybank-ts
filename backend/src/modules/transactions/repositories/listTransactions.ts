import { Collection } from "mongodb";
import { database } from "../../../config/mongo";
import { config } from "../../../config";

export const listTransactionsRepository = async (
  collection: Collection = database.collection(config.collections.transactions)
) => {
  const transactionsList = await collection.find().toArray();

  return transactionsList.map((transaction) => ({
    _id: transaction._id.toHexString(),
    sender: transaction.sender,
    senderBalanceAfter: transaction.senderBalanceAfter,
    receiver: transaction.receiver,
    receiverBalanceAfter: transaction.receiverBalanceAfter,
    amount: transaction.amount,
    code: transaction.code,
    createdAt: transaction.createdAt,
  }));
};
