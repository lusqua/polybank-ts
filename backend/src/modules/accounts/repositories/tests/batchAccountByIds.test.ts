import { Collection, ObjectId } from "mongodb";
import { batchAccountsByIds } from "../batchAccountsByIds";

const mockCollection = {
  find: jest.fn().mockReturnThis(),
  toArray: jest.fn(),
};

jest.mock("../../../../config/mongo", () => ({
  database: {
    collection: jest.fn(() => mockCollection),
  },
}));

describe("batchAccountsByIds", () => {
  const accountId1 = new ObjectId();
  const accountId2 = new ObjectId();
  const accountsData = [
    {
      _id: accountId1,
      name: "User One",
      balance: 100,
      email: "userone@example.com",
    },
    {
      _id: accountId2,
      name: "User Two",
      balance: 200,
      email: "usertwo@example.com",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the accounts without balances when hiddeBalance is true", async () => {
    mockCollection.toArray.mockResolvedValueOnce(accountsData);

    const result = await batchAccountsByIds([
      accountId1.toHexString(),
      accountId2.toHexString(),
    ]);

    expect(mockCollection.find).toHaveBeenCalledWith({
      _id: { $in: [accountId1, accountId2] },
    });
    expect(result).toEqual([
      { _id: accountId1, name: "User One", email: "userone@example.com" },
      { _id: accountId2, name: "User Two", email: "usertwo@example.com" },
    ]);
  });

  it("should return the accounts with balances when hiddeBalance is false", async () => {
    mockCollection.toArray.mockResolvedValueOnce(accountsData);

    const result = await batchAccountsByIds(
      [accountId1.toHexString(), accountId2.toHexString()],
      false
    );

    expect(mockCollection.find).toHaveBeenCalledWith({
      _id: { $in: [accountId1, accountId2] },
    });
    expect(result).toEqual(accountsData);
  });

  it("should return null for accounts that are not found", async () => {
    mockCollection.toArray.mockResolvedValueOnce([]);

    const result = await batchAccountsByIds([accountId1.toHexString()]);

    expect(mockCollection.find).toHaveBeenCalledWith({
      _id: { $in: [accountId1] },
    });
    expect(result).toEqual([undefined]);
  });
});
