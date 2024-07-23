import { ObjectId } from "mongodb";
import { findTransactionByIdRepository } from "../findTransactionById";

const mockCollection = {
  findOne: jest.fn(),
};

jest.mock("../../../../config/mongo", () => ({
  database: {
    collection: jest.fn(() => mockCollection),
  },
}));

describe("findTransactionByIdRepository", () => {
  const transactionId = new ObjectId();
  const transactionData = {
    _id: transactionId,
    account: "accountId",
    targetAccount: "targetAccountId",
    amount: 100,
    code: "transactionCode",
    createdAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the transaction data when the transaction exists", async () => {
    mockCollection.findOne.mockResolvedValueOnce(transactionData);

    const result = await findTransactionByIdRepository(
      transactionId.toHexString()
    );

    expect(mockCollection.findOne).toHaveBeenCalledWith({
      _id: new ObjectId(transactionId),
    });
    expect(result).toEqual({
      _id: transactionData._id.toHexString(),
      account: transactionData.account,
      targetAccount: transactionData.targetAccount,
      amount: transactionData.amount,
      code: transactionData.code,
      createdAt: transactionData.createdAt,
    });
  });

  it("should return null when the transaction does not exist", async () => {
    mockCollection.findOne.mockResolvedValueOnce(null);

    const result = await findTransactionByIdRepository(
      transactionId.toHexString()
    );

    expect(mockCollection.findOne).toHaveBeenCalledWith({
      _id: new ObjectId(transactionId),
    });
    expect(result).toBeNull();
  });
});
