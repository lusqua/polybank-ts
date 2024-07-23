import { createAccountRepository } from "../repositories/createAccount";
import { findOneAccountRepository } from "../repositories/findOneAccount";
import { accountType, AccountType } from "../type";

import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLInt,
} from "graphql";

type CreateAccountArgs = {
  name: string;
  balance: number;
  email: string;
};

export const createAccount = async (
  account: CreateAccountArgs
): Promise<AccountType> => {
  const insertedId = await createAccountRepository(account);

  const createdAccount = await findOneAccountRepository(insertedId);

  return {
    _id: insertedId,
    name: createdAccount?.name,
    balance: createdAccount?.balance,
    email: createdAccount?.email,
  };
};

export const CreateAccountInputType = new GraphQLInputObjectType({
  name: "CreateAccountInput",
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLInt,
    },
    email: {
      type: GraphQLString,
    },
  }),
});

export const CreateAccountPayloadType = new GraphQLObjectType({
  name: "CreateAccountPayload",
  fields: () => ({
    account: {
      type: accountType,
    },
  }),
});

export const CreateAccount: GraphQLFieldConfig<null, null> = {
  type: CreateAccountPayloadType,
  description: "Create a new account",
  args: {
    input: {
      type: CreateAccountInputType,
    },
  },
  resolve: async (_, args) => {
    const account = await createAccount(args.input);

    return {
      account,
    };
  },
};
