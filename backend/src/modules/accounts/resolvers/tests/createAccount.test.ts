import { createAccount } from "../createAccount";
import { createAccountRepository } from "../../repositories/createAccount";
import { findOneAccountRepository } from "../../repositories/findOneAccount";
import { AccountType } from "../../type";

jest.mock("../../repositories/createAccount");
jest.mock("../../repositories/findOneAccount");

const createAccountRepositoryMock = createAccountRepository as jest.Mock;
const findOneAccountRepositoryMock = findOneAccountRepository as jest.Mock;

describe("createAccount", () => {
  it("should create an account and return the account data", async () => {
    const newAccount = {
      name: "Test User",
      balance: 100,
      email: "testuser@example.com",
    };

    const insertedId = "1234567890";
    const createdAccount: AccountType = {
      _id: insertedId,
      name: newAccount.name,
      balance: newAccount.balance,
      email: newAccount.email,
    };

    createAccountRepositoryMock.mockResolvedValueOnce(insertedId);
    findOneAccountRepositoryMock.mockResolvedValueOnce(createdAccount);

    const result = await createAccount(newAccount);

    expect(createAccountRepositoryMock).toHaveBeenCalledWith(newAccount);
    expect(findOneAccountRepositoryMock).toHaveBeenCalledWith(insertedId);
    expect(result).toEqual(createdAccount);
  });
});
