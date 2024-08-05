import { GraphQLObjectType, GraphQLString, GraphQLSchema } from "graphql";
import { Mutation } from "./mutation";
import { accounts } from "../modules/accounts/resolvers/listAccounts";
import { account } from "../modules/accounts/resolvers/findAccount";
import { transactions } from "../modules/transactions/resolvers/listTransactions";
import { accountTransactions } from "../modules/transactions/resolvers/transactionsByAccount";
import { transactionReceived } from "../modules/transactions/resolvers/transactionReceived";
import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello, world!",
    },
    accounts,
    account,
    transactions,
    accountTransactions,
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation: Mutation,
  subscription: new GraphQLObjectType({
    name: "Subscription",
    fields: {
      transactionReceived: transactionReceived,
    },
  }),
});
