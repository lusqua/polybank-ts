import { ObjectId } from "mongodb";
import { createTransactionRepository } from "../createTransaction";

const mockCollection = {
  insertOne: jest.fn(),
};

jest.mock("../../../../config/mongo", () => ({
  database: {
    collection: jest.fn(() => mockCollection),
  },
}));

describe("createTransactionRepository", () => {
  const transactionArgs = {
    amount: 100,
    sender: new ObjectId().toHexString(),
    senderBalanceAfter: 900,
    receiver: new ObjectId().toHexString(),
    receiverBalanceAfter: 1100,
    code: "transactionCode",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should insert a new transaction and return the inserted ID", async () => {
    const insertedId = new ObjectId();
    mockCollection.insertOne.mockResolvedValueOnce({ insertedId });

    const result = await createTransactionRepository(transactionArgs);

    expect(mockCollection.insertOne).toHaveBeenCalledWith({
      sender: new ObjectId(transactionArgs.sender),
      senderBalanceAfter: transactionArgs.senderBalanceAfter,
      receiver: new ObjectId(transactionArgs.receiver),
      receiverBalanceAfter: transactionArgs.receiverBalanceAfter,
      amount: transactionArgs.amount,
      createdAt: expect.any(Date),
      code: transactionArgs.code,
    });
    expect(result).toBe(insertedId.toHexString());
  });
});
