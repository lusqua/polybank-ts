// src/modules/transactions/resolvers/tests/makeTransaction.test.ts
import { makeTransaction } from "../makeTransaction";
import { findAccount } from "../../../accounts/resolvers/findAccount";
import { createTransactionLock } from "../../../transaction-lockers/repositories/createTransactionLock";
import { changeUserAccount } from "../../../accounts/repositories/changeUserAccount";
import { deleteTransactionLock } from "../../../transaction-lockers/repositories/deleteTransactionLock";
import { createTransactionRepository } from "../../repositories/createTransaction";
import { findTransactionByIdRepository } from "../../repositories/findTransactionById";
import { findTransactionByCodeRepository } from "../../repositories/findTransactionByCode";

// Mock the repositories
jest.mock("../../../accounts/resolvers/findAccount");
jest.mock("../../../transaction-lockers/repositories/createTransactionLock");
jest.mock("../../../accounts/repositories/changeUserAccount");
jest.mock("../../../transaction-lockers/repositories/deleteTransactionLock");
jest.mock("../../repositories/createTransaction");
jest.mock("../../repositories/findTransactionById");
jest.mock("../../repositories/findTransactionByCode");

const findAccountMock = findAccount as jest.Mock;
const createTransactionLockMock = createTransactionLock as jest.Mock;
const changeUserAccountMock = changeUserAccount as jest.Mock;
const deleteTransactionLockMock = deleteTransactionLock as jest.Mock;
const createTransactionRepositoryMock =
  createTransactionRepository as jest.Mock;
const findTransactionByIdRepositoryMock =
  findTransactionByIdRepository as jest.Mock;
const findTransactionByCodeRepositoryMock =
  findTransactionByCodeRepository as jest.Mock;

describe("makeTransaction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if the sender account is not found", async () => {
    findAccountMock.mockResolvedValueOnce(null);

    const result = await makeTransaction({
      sender: "nonexistentAccount",
      receiver: "targetAccountId",
      amount: 100,
      code: "transactionCode",
    });

    expect(result).toEqual({
      success: false,
      transaction: null,
      error: "Account not found",
      targetAccount: null,
      account: null,
    });
  });

  it("should return an error if the amount is invalid", async () => {
    findAccountMock.mockResolvedValueOnce({ _id: "accountId", balance: 1000 });

    const result = await makeTransaction({
      sender: "accountId",
      receiver: "targetAccountId",
      amount: -100,
      code: "transactionCode",
    });

    expect(result).toEqual({
      success: false,
      transaction: null,
      error: "Invalid amount",
      targetAccount: null,
      account: null,
    });
  });

  it("should return an error if the transaction code already exists", async () => {
    findAccountMock.mockResolvedValueOnce({ _id: "accountId", balance: 1000 });
    findTransactionByCodeRepositoryMock.mockResolvedValueOnce({});

    const result = await makeTransaction({
      sender: "accountId",
      receiver: "targetAccountId",
      amount: 100,
      code: "transactionCode",
    });

    expect(result).toEqual({
      success: false,
      transaction: null,
      error: "Transaction already exists",
      targetAccount: null,
      account: null,
    });
  });

  it("should return an error if the receiver account is not found", async () => {
    findAccountMock.mockResolvedValueOnce({ _id: "accountId", balance: 1000 });
    findTransactionByCodeRepositoryMock.mockResolvedValueOnce(null);
    findAccountMock.mockResolvedValueOnce(null);

    const result = await makeTransaction({
      sender: "accountId",
      receiver: "nonexistentTargetAccount",
      amount: 100,
      code: "transactionCode",
    });

    expect(result).toEqual({
      success: false,
      transaction: null,
      error: "Receiver not found",
      targetAccount: null,
      account: null,
    });
  });

  it("should return an error if the sender balance is insufficient", async () => {
    findAccountMock.mockResolvedValueOnce({ _id: "accountId", balance: 50 });
    findTransactionByCodeRepositoryMock.mockResolvedValueOnce(null);
    findAccountMock.mockResolvedValueOnce({ _id: "targetAccountId" });

    const result = await makeTransaction({
      sender: "accountId",
      receiver: "targetAccountId",
      amount: 100,
      code: "transactionCode",
    });

    expect(result).toEqual({
      success: false,
      transaction: null,
      error: "Insufficient balance",
      targetAccount: null,
      account: null,
    });
  });

  it("should create a transaction successfully", async () => {
    findAccountMock.mockResolvedValueOnce({ _id: "accountId", balance: 1000 });
    findTransactionByCodeRepositoryMock.mockResolvedValueOnce(null);
    findAccountMock.mockResolvedValueOnce({ _id: "targetAccountId" });
    createTransactionLockMock.mockResolvedValueOnce({
      success: true,
      insertedId: "lockId",
    });
    changeUserAccountMock.mockResolvedValueOnce(900);
    changeUserAccountMock.mockResolvedValueOnce(1100);
    createTransactionRepositoryMock.mockResolvedValueOnce("transactionId");
    deleteTransactionLockMock.mockResolvedValueOnce(true);
    findTransactionByIdRepositoryMock.mockResolvedValueOnce({
      _id: "transactionId",
      account: "accountId",
      targetAccount: "targetAccountId",
      amount: 100,
      code: "transactionCode",
      createdAt: new Date(),
    });
    findAccountMock.mockResolvedValueOnce({ _id: "accountId", balance: 900 });
    findAccountMock.mockResolvedValueOnce({
      _id: "targetAccountId",
      balance: 1100,
    });

    const result = await makeTransaction({
      sender: "accountId",
      receiver: "targetAccountId",
      amount: 100,
      code: "transactionCode",
    });

    expect(result).toEqual({
      success: true,
      transaction: {
        _id: "transactionId",
        account: "accountId",
        toAccount: "targetAccountId",
        amount: 100,
        createdAt: expect.any(Date),
      },
      error: null,
      targetAccount: { _id: "targetAccountId", balance: 1100 },
      account: { _id: "accountId", balance: 900 },
    });
  });
});
