import { ObjectId } from "mongodb";
import { transactionsByAccountIdRepository } from "../transactionsByAccountId";

const mockCollection = {
  find: jest.fn().mockReturnThis(),
  toArray: jest.fn(),
};

jest.mock("../../../../config/mongo", () => ({
  database: {
    collection: jest.fn(() => mockCollection),
  },
}));

describe("transactionsByAccountIdRepository", () => {
  const accountId = new ObjectId();
  const transactionsData = [
    {
      _id: new ObjectId(),
      sender: accountId,
      senderBalanceAfter: 900,
      receiver: new ObjectId(),
      receiverBalanceAfter: 1100,
      amount: 100,
      code: "transactionCode1",
      createdAt: new Date(),
    },
    {
      _id: new ObjectId(),
      sender: new ObjectId(),
      senderBalanceAfter: 800,
      receiver: accountId,
      receiverBalanceAfter: 1200,
      amount: 200,
      code: "transactionCode2",
      createdAt: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the list of transactions for the given account ID", async () => {
    mockCollection.toArray.mockResolvedValueOnce(transactionsData);

    const result = await transactionsByAccountIdRepository(
      accountId.toHexString()
    );

    expect(mockCollection.find).toHaveBeenCalledWith({
      $or: [{ sender: accountId }, { receiver: accountId }],
    });
    expect(result).toEqual(
      transactionsData.map((transaction) => ({
        _id: transaction._id.toHexString(),
        sender: transaction.sender.toHexString(),
        senderBalanceAfter: transaction.senderBalanceAfter,
        receiver: transaction.receiver.toHexString(),
        receiverBalanceAfter: transaction.receiverBalanceAfter,
        amount: transaction.amount,
        code: transaction.code,
        createdAt: transaction.createdAt,
      }))
    );
  });

  it("should return an empty list when no transactions are found for the given account ID", async () => {
    mockCollection.toArray.mockResolvedValueOnce([]);

    const result = await transactionsByAccountIdRepository(
      accountId.toHexString()
    );

    expect(mockCollection.find).toHaveBeenCalledWith({
      $or: [{ sender: accountId }, { receiver: accountId }],
    });
    expect(result).toEqual([]);
  });
});
