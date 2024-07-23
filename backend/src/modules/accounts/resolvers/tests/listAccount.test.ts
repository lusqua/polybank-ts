// src/modules/accounts/resolvers/tests/listAccounts.test.ts
import { listAccounts } from "../listAccounts";
import { getAccounts } from "../../repositories/getAccounts";
import { AccountType } from "../../type";

// Mock the repository
jest.mock("../../repositories/getAccounts");

const getAccountsMock = getAccounts as jest.Mock;

describe("listAccounts", () => {
  it("should return a list of accounts", async () => {
    const accounts: AccountType[] = [
      {
        _id: "1",
        name: "User One",
        balance: 100,
        email: "userone@example.com",
      },
      {
        _id: "2",
        name: "User Two",
        balance: 200,
        email: "usertwo@example.com",
      },
    ];

    getAccountsMock.mockResolvedValueOnce(accounts);

    const result = await listAccounts();

    expect(getAccountsMock).toHaveBeenCalled();
    expect(result).toEqual(accounts);
  });

  it("should return an empty list when there are no accounts", async () => {
    getAccountsMock.mockResolvedValueOnce([]);

    const result = await listAccounts();

    expect(getAccountsMock).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
