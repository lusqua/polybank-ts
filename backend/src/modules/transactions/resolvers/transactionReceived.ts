import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";
import { pubsub } from "../../../schema/schema";

const TransactionReceivedType = new GraphQLObjectType({
  name: "TransactionReceived",
  fields: {
    message: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    sender: { type: GraphQLString },
  },
});

export const transactionReceived = {
  type: TransactionReceivedType,
  args: {
    email: { type: GraphQLString },
  },
  subscribe: (_: any, { email }: any) => {
    return pubsub.asyncIterator(`TRANSACTION_RECEIVED_${email}`);
  },
};

export const notifyTransactionReceived = (
  email: string,
  transaction: { message: string; amount: number; sender: string }
) => {
  pubsub.publish(`TRANSACTION_RECEIVED_${email}`, {
    transactionReceived: transaction,
  });
};
