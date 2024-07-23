import { Collection, ObjectId } from "mongodb";
import { database } from "../../../config/mongo";
import { config } from "../../../config";

export const deleteTransactionLock = async (
  id: string,
  lockers: Collection = database.collection(
    config.collections.transactionsLocks
  )
): Promise<boolean> => {
  const { deletedCount } = await lockers.deleteOne({
    _id: new ObjectId(id),
  });

  return deletedCount === 1;
};
