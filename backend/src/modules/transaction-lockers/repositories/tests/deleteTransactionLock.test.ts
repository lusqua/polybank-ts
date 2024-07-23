import { ObjectId } from "mongodb";
import { deleteTransactionLock } from "../deleteTransactionLock";

const mockCollection = {
  deleteOne: jest.fn(),
};

jest.mock("../../../../config/mongo", () => ({
  database: {
    collection: jest.fn(() => mockCollection),
  },
}));

describe("deleteTransactionLock", () => {
  const lockId = new ObjectId();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the transaction lock and return true when successful", async () => {
    mockCollection.deleteOne.mockResolvedValueOnce({ deletedCount: 1 });

    const result = await deleteTransactionLock(lockId.toHexString());

    expect(mockCollection.deleteOne).toHaveBeenCalledWith({
      _id: new ObjectId(lockId),
    });
    expect(result).toBe(true);
  });

  it("should return false when the transaction lock is not found", async () => {
    mockCollection.deleteOne.mockResolvedValueOnce({ deletedCount: 0 });

    const result = await deleteTransactionLock(lockId.toHexString());

    expect(mockCollection.deleteOne).toHaveBeenCalledWith({
      _id: new ObjectId(lockId),
    });
    expect(result).toBe(false);
  });
});
