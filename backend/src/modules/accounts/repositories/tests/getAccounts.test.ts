import { ObjectId } from "mongodb";
import { getAccounts } from "../getAccounts";

const mockCollection = {
  find: jest.fn().mockReturnThis(),
  toArray: jest.fn(),
};

jest.mock("../../../../config/mongo", () => ({
  database: {
    collection: jest.fn(() => mockCollection),
  },
}));

describe("getAccounts", () => {
  const accountsData = [
    {
      _id: new ObjectId(),
      name: "User One",
      balance: 100,
      email: "userone@example.com",
    },
    {
      _id: new ObjectId(),
      name: "User Two",
      balance: 200,
      email: "usertwo@example.com",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the list of accounts", async () => {
    mockCollection.toArray.mockResolvedValueOnce(accountsData);

    const result = await getAccounts();

    expect(mockCollection.find).toHaveBeenCalledWith({});
    expect(result).toEqual(
      accountsData.map((account) => ({
        _id: account._id.toHexString(),
        name: account.name,
        balance: account.balance,
        email: account.email,
      }))
    );
  });

  it("should return an empty list when there are no accounts", async () => {
    mockCollection.toArray.mockResolvedValueOnce([]);

    const result = await getAccounts();

    expect(mockCollection.find).toHaveBeenCalledWith({});
    expect(result).toEqual([]);
  });
});
