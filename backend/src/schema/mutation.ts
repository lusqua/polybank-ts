import { GraphQLObjectType } from "graphql";
import { CreateAccount } from "../modules/accounts/resolvers/createAccount";
import { CreateTransaction } from "../modules/transactions/resolvers/makeTransaction";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    CreateAccount,
    CreateTransaction,
  }),
});
