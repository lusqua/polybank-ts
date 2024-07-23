import { ObjectId } from "mongodb";
import { findOneAccountRepository } from "../findOneAccount";

const mockCollection = {
  findOne: jest.fn(),
};

jest.mock("../../../../config/mongo", () => ({
  database: {
    collection: jest.fn(() => mockCollection),
  },
}));

describe("findOneAccountRepository", () => {
  const accountId = new ObjectId();
  const accountData = {
    _id: accountId,
    name: "Test User",
    balance: 100,
    email: "testuser@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the account data when the account exists", async () => {
    mockCollection.findOne.mockResolvedValueOnce(accountData);

    const result = await findOneAccountRepository(accountId.toHexString());

    expect(mockCollection.findOne).toHaveBeenCalledWith({
      _id: new ObjectId(accountId),
    });
    expect(result).toEqual({
      _id: accountId.toHexString(),
      name: "Test User",
      balance: 100,
      email: "testuser@example.com",
    });
  });

  it("should return null when the account does not exist", async () => {
    mockCollection.findOne.mockResolvedValueOnce(null);

    const result = await findOneAccountRepository(accountId.toHexString());

    expect(mockCollection.findOne).toHaveBeenCalledWith({
      _id: new ObjectId(accountId),
    });
    expect(result).toBeNull();
  });
});
