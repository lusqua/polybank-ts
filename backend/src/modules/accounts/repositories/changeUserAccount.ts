import { Collection, ObjectId } from "mongodb";
import { database } from "../../../config/mongo";
import { config } from "../../../config";

export const changeUserAccount = async (
  userId: string,
  amount: number,
  accounts: Collection = database.collection(config.collections.accounts)
): Promise<number> => {
  await accounts.updateOne(
    { _id: new ObjectId(userId) },
    { $inc: { balance: amount } }
  );

  const acc = await accounts.findOne(
    { _id: new ObjectId(userId) },
    {
      projection: {
        balance: 1,
      },
    }
  );

  if (!acc) throw new Error("Account not found");

  return acc!.balance;
};
