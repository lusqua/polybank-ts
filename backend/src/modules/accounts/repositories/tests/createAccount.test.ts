import { ObjectId } from "mongodb";
import { createAccountRepository } from "../createAccount";

const mockCollection = {
  insertOne: jest.fn(),
};

jest.mock("../../../../config/mongo", () => ({
  database: {
    collection: jest.fn(() => mockCollection),
  },
}));

describe("createAccountRepository", () => {
  const account = {
    name: "Test User",
    balance: 100,
    email: "testuser@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should insert a new account and return the inserted ID", async () => {
    const insertedId = new ObjectId();
    mockCollection.insertOne.mockResolvedValueOnce({ insertedId });

    const result = await createAccountRepository(account);

    expect(mockCollection.insertOne).toHaveBeenCalledWith(account);
    expect(result).toBe(insertedId.toHexString());
  });
});
