import { findAccount } from "../findAccount";
import { findOneAccountRepository } from "../../repositories/findOneAccount";
import { AccountType } from "../../type";

jest.mock("../../repositories/findOneAccount");

const findOneAccountRepositoryMock = findOneAccountRepository as jest.Mock;

describe("findAccount", () => {
  it("should return the account data when account exists", async () => {
    const userId = "1234567890";
    const account: AccountType = {
      _id: userId,
      name: "Test User",
      balance: 100,
      email: "testuser@example.com",
    };

    findOneAccountRepositoryMock.mockResolvedValueOnce(account);

    const result = await findAccount(userId);

    expect(findOneAccountRepositoryMock).toHaveBeenCalledWith(userId);
    expect(result).toEqual(account);
  });

  it("should throw an error when account does not exist", async () => {
    const userId = "1234567890";

    findOneAccountRepositoryMock.mockResolvedValueOnce(null);

    await expect(findAccount(userId)).rejects.toThrow("Account not found");
    expect(findOneAccountRepositoryMock).toHaveBeenCalledWith(userId);
  });
});
