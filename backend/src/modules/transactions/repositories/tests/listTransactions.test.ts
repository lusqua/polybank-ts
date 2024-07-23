import { ObjectId } from "mongodb";
import { listTransactionsRepository } from "../listTransactions";

// Mock the database collection
const mockCollection = {
  find: jest.fn().mockReturnThis(),
  toArray: jest.fn(),
};

jest.mock("../../../../config/mongo", () => ({
  database: {
    collection: jest.fn(() => mockCollection),
  },
}));

describe("listTransactionsRepository", () => {
  const transactionsData = [
    {
      _id: new ObjectId(),
      sender: "accountId1",
      senderBalanceAfter: 900,
      receiver: "targetAccountId1",
      receiverBalanceAfter: 1100,
      amount: 100,
      code: "transactionCode1",
      createdAt: new Date(),
    },
    {
      _id: new ObjectId(),
      sender: "accountId2",
      senderBalanceAfter: 800,
      receiver: "targetAccountId2",
      receiverBalanceAfter: 1200,
      amount: 200,
      code: "transactionCode2",
      createdAt: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the list of transactions", async () => {
    mockCollection.toArray.mockResolvedValueOnce(transactionsData);

    const result = await listTransactionsRepository();

    expect(mockCollection.find).toHaveBeenCalled();
    expect(result).toEqual(
      transactionsData.map((transaction) => ({
        _id: transaction._id.toHexString(),
        sender: transaction.sender,
        senderBalanceAfter: transaction.senderBalanceAfter,
        receiver: transaction.receiver,
        receiverBalanceAfter: transaction.receiverBalanceAfter,
        amount: transaction.amount,
        code: transaction.code,
        createdAt: transaction.createdAt,
      }))
    );
  });

  it("should return an empty list when there are no transactions", async () => {
    mockCollection.toArray.mockResolvedValueOnce([]);

    const result = await listTransactionsRepository();

    expect(mockCollection.find).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
