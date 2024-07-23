import { Collection, ObjectId } from "mongodb";
import { database } from "../../../config/mongo";
import { config } from "../../../config";

type CreateTransactionArgs = {
  amount: number;
  sender: string;
  senderBalanceAfter: number;
  receiver: string;
  receiverBalanceAfter: number;
  code: string;
};

export const createTransactionRepository = async (
  args: CreateTransactionArgs,
  transactions: Collection = database.collection(
    config.collections.transactions
  )
): Promise<string> => {
  const { insertedId } = await transactions.insertOne({
    sender: new ObjectId(args.sender),
    senderBalanceAfter: args.senderBalanceAfter,
    receiver: new ObjectId(args.receiver),
    receiverBalanceAfter: args.receiverBalanceAfter,
    amount: args.amount,
    createdAt: new Date(),
    code: args.code,
  });

  return insertedId.toHexString();
};
