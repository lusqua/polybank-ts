// src/modules/transactions/resolvers/tests/listTransactions.test.ts
import { listTransactions } from "../listTransactions";
import { listTransactionsRepository } from "../../repositories/listTransactions";
import { batchAccountsByIds } from "../../../accounts/repositories/batchAccountsByIds";
import { TransactionType } from "../../type";
import { ObjectId } from "mongodb";

// Mock the repositories
jest.mock("../../repositories/listTransactions");
jest.mock("../../../accounts/repositories/batchAccountsByIds");

const listTransactionsRepositoryMock = listTransactionsRepository as jest.Mock;
const batchAccountsByIdsMock = batchAccountsByIds as jest.Mock;

describe("listTransactions", () => {
  const transactionsData: TransactionType[] = [
    {
      _id: "transactionId1",
      sender: new ObjectId().toHexString(),
      senderBalanceAfter: 900,
      receiver: new ObjectId().toHexString(),
      receiverBalanceAfter: 1100,
      amount: 100,
      code: "transactionCode1",
      createdAt: new Date().toString(),
    },
    {
      _id: "transactionId2",
      sender: new ObjectId().toHexString(),
      senderBalanceAfter: 800,
      receiver: new ObjectId().toHexString(),
      receiverBalanceAfter: 1200,
      amount: 200,
      code: "transactionCode2",
      createdAt: new Date().toString(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the list of transactions with accounts loaded by DataLoader", async () => {
    listTransactionsRepositoryMock.mockResolvedValueOnce(transactionsData);
    const result = await listTransactions();

    expect(listTransactionsRepositoryMock).toHaveBeenCalled();

    const expectedTransactions = transactionsData.map((transaction) => ({
      _id: transaction._id,
      sender: expect.any(Function),
      senderBalanceAfter: transaction.senderBalanceAfter,
      receiver: expect.any(Function),
      receiverBalanceAfter: transaction.receiverBalanceAfter,
      amount: transaction.amount,
      code: transaction.code,
      createdAt: transaction.createdAt,
    }));

    expect(result).toEqual(expectedTransactions);
  });
});
