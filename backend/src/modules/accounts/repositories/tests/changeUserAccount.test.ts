import { ObjectId } from "mongodb";
import { changeUserAccount } from "../changeUserAccount";

const mockCollection = {
  updateOne: jest.fn(),
  findOne: jest.fn(),
};

jest.mock("../../../../config/mongo", () => ({
  database: {
    collection: jest.fn(() => mockCollection),
  },
}));

describe("changeUserAccount", () => {
  const userId = new ObjectId();
  const initialBalance = 100;
  const amount = 50;
  const updatedBalance = initialBalance + amount;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the user balance and return the new balance", async () => {
    mockCollection.updateOne.mockResolvedValueOnce({ modifiedCount: 1 });
    mockCollection.findOne.mockResolvedValueOnce({ balance: updatedBalance });

    const result = await changeUserAccount(userId.toHexString(), amount);

    expect(mockCollection.updateOne).toHaveBeenCalledWith(
      { _id: new ObjectId(userId) },
      { $inc: { balance: amount } }
    );
    expect(mockCollection.findOne).toHaveBeenCalledWith(
      { _id: new ObjectId(userId) },
      {
        projection: {
          balance: 1,
        },
      }
    );
    expect(result).toBe(updatedBalance);
  });

  it("should throw an error if the account is not found", async () => {
    mockCollection.updateOne.mockResolvedValueOnce({ modifiedCount: 1 });
    mockCollection.findOne.mockResolvedValueOnce(null);

    await expect(
      changeUserAccount(userId.toHexString(), amount)
    ).rejects.toThrow("Account not found");

    expect(mockCollection.updateOne).toHaveBeenCalledWith(
      { _id: new ObjectId(userId) },
      { $inc: { balance: amount } }
    );
    expect(mockCollection.findOne).toHaveBeenCalledWith(
      { _id: new ObjectId(userId) },
      {
        projection: {
          balance: 1,
        },
      }
    );
  });
});
