import { accountType, AccountType } from "../type";
import { findOneAccountRepository } from "../repositories/findOneAccount";
import { GraphQLString } from "graphql";

export const findAccount = async (userId: string): Promise<AccountType> => {
  const account = await findOneAccountRepository(userId);

  if (!account) throw new Error("Account not found");

  return account;
};

export const account = {
  type: accountType,
  description: "Get a account by ID",
  args: {
    id: { type: GraphQLString },
  },
  resolve: (_: any, args: any) => {
    return findAccount(args.id);
  },
};
