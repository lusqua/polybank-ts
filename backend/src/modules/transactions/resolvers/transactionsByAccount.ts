import DataLoader from "dataloader";
import { transactionsByAccountIdRepository } from "../repositories/transactionsByAccountId";
import { Transaction, transactionType, TransactionType } from "../type";
import { batchAccountsByIds } from "../../accounts/repositories/batchAccountsByIds";
import { GraphQLList, GraphQLString } from "graphql";

export const transactionsByAccount = async (
  id: string
): Promise<Transaction[]> => {
  const transactions = await transactionsByAccountIdRepository(id);

  const accountLoader = new DataLoader<string, any>((ids) =>
    batchAccountsByIds(ids)
  );

  return transactions.map((transaction: TransactionType) => {
    return {
      _id: transaction._id,
      sender: () => {
        const senderId = transaction.sender;
        return accountLoader.load(senderId);
      },
      receiver: () => {
        const receiverId = transaction.receiver;
        return accountLoader.load(receiverId);
      },
      amount: transaction.amount,
      code: transaction.code,
      createdAt: transaction.createdAt,
    };
  });
};

export const accountTransactions = {
  type: new GraphQLList(transactionType),
  description: "List of all transactions by account",
  args: {
    accountId: {
      type: GraphQLString,
    },
  },
  resolve: async (_: any, args: any) => {
    return transactionsByAccount(args.accountId);
  },
};
