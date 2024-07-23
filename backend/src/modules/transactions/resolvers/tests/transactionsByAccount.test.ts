// src/modules/transactions/resolvers/tests/transactionsByAccount.test.ts
import DataLoader from "dataloader";
import { transactionsByAccount } from "../transactionsByAccount";
import { transactionsByAccountIdRepository } from "../../repositories/transactionsByAccountId";
import { batchAccountsByIds } from "../../../accounts/repositories/batchAccountsByIds";
import { TransactionType } from "../../type";

// Mock the repositories
jest.mock("../../repositories/transactionsByAccountId");
jest.mock("../../../accounts/repositories/batchAccountsByIds");

const transactionsByAccountIdRepositoryMock =
  transactionsByAccountIdRepository as jest.Mock;
const batchAccountsByIdsMock = batchAccountsByIds as jest.Mock;

describe("transactionsByAccount", () => {
  const transactionsData: TransactionType[] = [
    {
      _id: "transactionId1",
      sender: "accountId1",
      senderBalanceAfter: 900,
      receiver: "targetAccountId1",
      receiverBalanceAfter: 1100,
      amount: 100,
      code: "transactionCode1",
      createdAt: new Date().toString(),
    },
    {
      _id: "transactionId2",
      sender: "accountId2",
      senderBalanceAfter: 800,
      receiver: "targetAccountId2",
      receiverBalanceAfter: 1200,
      amount: 200,
      code: "transactionCode2",
      createdAt: new Date().toString(),
    },
  ];

  const accountsData = [
    {
      _id: "accountId1",
      name: "Account 1",
      balance: 1000,
      email: "account1@example.com",
    },
    {
      _id: "accountId2",
      name: "Account 2",
      balance: 2000,
      email: "account2@example.com",
    },
    {
      _id: "targetAccountId1",
      name: "Target Account 1",
      balance: 1500,
      email: "target1@example.com",
    },
    {
      _id: "targetAccountId2",
      name: "Target Account 2",
      balance: 2500,
      email: "target2@example.com",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the list of transactions with accounts loaded by DataLoader", async () => {
    transactionsByAccountIdRepositoryMock.mockResolvedValueOnce(
      transactionsData
    );

    const result = await transactionsByAccount("accountId1");

    expect(transactionsByAccountIdRepositoryMock).toHaveBeenCalledWith(
      "accountId1"
    );

    const expectedTransactions = transactionsData.map((transaction) => ({
      _id: transaction._id,
      sender: expect.any(Function),
      receiver: expect.any(Function),
      amount: transaction.amount,
      code: transaction.code,
      createdAt: transaction.createdAt,
    }));

    expect(result).toEqual(expectedTransactions);
  });
});
