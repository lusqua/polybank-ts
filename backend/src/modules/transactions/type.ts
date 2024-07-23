import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLContext } from "../../context";
import { AccountType, accountType } from "../accounts/type";

export const transactionType = new GraphQLObjectType<
  Record<string, unknown>,
  GraphQLContext
>({
  name: "Transactions",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    sender: { type: accountType },
    senderBalanceAfter: { type: new GraphQLNonNull(GraphQLInt) },
    receiver: { type: accountType },
    receiverBalanceAfter: { type: new GraphQLNonNull(GraphQLInt) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export type Transaction = {
  _id: string;
  sender: () => Promise<AccountType>;
  senderBalanceAfter?: number;
  receiver: () => Promise<AccountType>;
  receiverBalanceAfter?: number;
  amount: number;
  code: string;
  createdAt: string;
};

export type TransactionType = {
  _id: string;
  sender: string;
  senderBalanceAfter: number;
  receiver: string;
  receiverBalanceAfter: number;
  amount: number;
  code: string;
  createdAt: string;
};
