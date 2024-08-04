import { GraphQLList } from "graphql";
import { transactionType } from "../type";
import { listTransactionsRepository } from "../repositories/listTransactions";
import { ContextType } from "../../../context";

export const listTransactions = async (
  _parent: any,
  _args: any,
  context: ContextType
) => {
  const transactions = await listTransactionsRepository();
  const { accountLoader } = context.dataloaders;

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
