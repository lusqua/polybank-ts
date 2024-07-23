import { ObjectId } from "mongodb";
import { findTransactionByCodeRepository } from "../findTransactionByCode";

const mockCollection = {
  findOne: jest.fn(),
};

jest.mock("../../../../config/mongo", () => ({
  database: {
    collection: jest.fn(() => mockCollection),
  },
}));

describe("findTransactionByCodeRepository", () => {
  const transactionCode = "transactionCode";
  const transactionData = {
    _id: new ObjectId(),
    sender: "senderUserId",
    senderBalanceAfter: 900,
    receiver: "receiverUserId",
    receiverBalanceAfter: 1100,
    amount: 100,
    code: transactionCode,
    createdAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the transaction data when the transaction exists", async () => {
    mockCollection.findOne.mockResolvedValueOnce(transactionData);

    const result = await findTransactionByCodeRepository(transactionCode);

    expect(mockCollection.findOne).toHaveBeenCalledWith({
      code: transactionCode,
    });
    expect(result).toEqual({
      _id: transactionData._id.toHexString(),
      sender: transactionData.sender,
      senderBalanceAfter: transactionData.senderBalanceAfter,
      receiver: transactionData.receiver,
      receiverBalanceAfter: transactionData.receiverBalanceAfter,
      amount: transactionData.amount,
      code: transactionData.code,
      createdAt: transactionData.createdAt,
    });
  });

  it("should return null when the transaction does not exist", async () => {
    mockCollection.findOne.mockResolvedValueOnce(null);

    const result = await findTransactionByCodeRepository(transactionCode);

    expect(mockCollection.findOne).toHaveBeenCalledWith({
      code: transactionCode,
    });
    expect(result).toBeNull();
  });
});
