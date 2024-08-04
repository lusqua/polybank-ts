import { Collection, ObjectId } from "mongodb";
import { database } from "../../../config/mongo";
import { config } from "../../../config";

// Função para carregar contas em lote
export const batchAccountsByIds = async (
  ids: readonly string[],
  hiddeBalance = true,
  accounts: Collection = database.collection(config.collections.accounts)
) => {
  console.log("batchAccountsByIds", ids);

  const objectIds = ids.map((id) => new ObjectId(id));

  const accountList = await accounts
    .find({
      _id: {
        $in: objectIds,
      },
    })
    .toArray();

  const accountMap = new Map(
    accountList.map((account) => [account._id.toHexString(), account])
  );

  const result = ids.map((id) => accountMap.get(id.toString()));

  return result.map((account) => {
    if (hiddeBalance) {
      delete account?.balance;
    }

    return account;
  });
};
