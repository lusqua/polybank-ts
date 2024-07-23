import { config } from "../../../config";
import { database } from "../../../config/mongo";

type CreateTransactionResponse = {
  success: boolean;
  insertedId: string | null;
  error: string | null;
};

export const createTransactionLock = async (
  user: string,
  amount: number,
  toAccount: string,
  collection = database.collection(config.collections.transactionsLocks)
): Promise<CreateTransactionResponse> => {
  await collection.createIndex({ user: 1 }, { unique: true });

  try {
    const result = await collection.insertOne({
      user,
      amount,
      toAccount,
    });

    return {
      success: true,
      insertedId: result.insertedId.toHexString(),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      insertedId: null,
      error: "Transaction already in progress",
    };
  }
};
