import { createTransactionLock } from "../createTransactionLock";

const mockCollection = {
  createIndex: jest.fn(),
  insertOne: jest.fn(),
};

jest.mock("../../../../config/mongo", () => ({
  database: {
    collection: jest.fn(() => mockCollection),
  },
}));

describe("createTransactionLock", () => {
  const user = "testUser";
  const amount = 100;
  const toAccount = "recipientAccount";
  const insertedId = "1234567890abcdef12345678";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a transaction lock and return success", async () => {
    mockCollection.createIndex.mockResolvedValueOnce({
      createdCollectionAutomatically: false,
    });
    mockCollection.insertOne.mockResolvedValueOnce({
      insertedId: { toHexString: () => insertedId },
    });

    const result = await createTransactionLock(user, amount, toAccount);

    expect(mockCollection.createIndex).toHaveBeenCalledWith(
      { user: 1 },
      { unique: true }
    );
    expect(mockCollection.insertOne).toHaveBeenCalledWith({
      user,
      amount,
      toAccount,
    });
    expect(result).toEqual({
      success: true,
      insertedId: insertedId,
      error: null,
    });
  });

  it("should return an error if the transaction lock already exists", async () => {
    mockCollection.createIndex.mockResolvedValueOnce({
      createdCollectionAutomatically: false,
    });
    mockCollection.insertOne.mockRejectedValueOnce(
      new Error("duplicate key error")
    );

    const result = await createTransactionLock(user, amount, toAccount);

    expect(mockCollection.createIndex).toHaveBeenCalledWith(
      { user: 1 },
      { unique: true }
    );
    expect(mockCollection.insertOne).toHaveBeenCalledWith({
      user,
      amount,
      toAccount,
    });
    expect(result).toEqual({
      success: false,
      insertedId: null,
      error: "Transaction already in progress",
    });
  });
});
