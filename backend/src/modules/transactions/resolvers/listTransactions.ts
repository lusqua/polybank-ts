import { GraphQLList } from "graphql";
import { transactionType } from "../type";
import { listTransactionsRepository } from "../repositories/listTransactions";
import DataLoader from "dataloader";
import { batchAccountsByIds } from "../../accounts/repositories/batchAccountsByIds";

export const listTransactions = async () => {
  const accountLoader = new DataLoader<string, any>((ids) =>
    batchAccountsByIds(ids)
  );

  const transactions = await listTransactionsRepository();

  return transactions.map((transaction) => {
    return {
      _id: transaction._id,
      sender: () => {
        const senderId = transaction.sender;
        return accountLoader.load(senderId);
      },
      senderBalanceAfter: transaction.senderBalanceAfter,
      receiver: () => {
        const receiverId = transaction.receiver;
        return accountLoader.load(receiverId);
      },
      receiverBalanceAfter: transaction.receiverBalanceAfter,
      amount: transaction.amount,
      code: transaction.code,
      createdAt: transaction.createdAt,
    };
  });
};

export const transactions = {
  type: new GraphQLList(transactionType),
  description: "List of all transactions",
  resolve: listTransactions,
};
