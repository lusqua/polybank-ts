import { GraphQLList } from "graphql";
import { getAccounts } from "../repositories/getAccounts";
import { accountType, AccountType } from "../type";

export const listAccounts = async (): Promise<AccountType[]> => {
  const accounts = await getAccounts();

  return accounts;
};

export const accounts = {
  type: new GraphQLList(accountType),
  description: "List of all accounts",
  resolve: () => listAccounts(),
};
