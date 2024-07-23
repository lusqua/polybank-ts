import { Collection, ObjectId } from "mongodb";
import { database } from "../../../config/mongo";
import { TransactionType } from "../type";
import { config } from "../../../config";

export const transactionsByAccountIdRepository = async (
  id: string,
  transactions: Collection = database.collection(
    config.collections.transactions
  )
): Promise<TransactionType[]> => {
  const parsedId = new ObjectId(id);

  const findedTransactions = await transactions
    .find({
      $or: [{ sender: parsedId }, { receiver: parsedId }],
    })
    .toArray();

  return findedTransactions.map((transaction) => {
    return {
      _id: transaction._id.toHexString(),
      sender: transaction.sender.toHexString(),
      senderBalanceAfter: transaction.senderBalanceAfter,
      receiver: transaction.receiver.toHexString(),
      receiverBalanceAfter: transaction.receiverBalanceAfter,
      amount: transaction.amount,
      code: transaction.code,
      createdAt: transaction.createdAt,
    };
  });
};
