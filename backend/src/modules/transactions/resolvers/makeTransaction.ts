import { createTransactionLock } from "../../transaction-lockers/repositories/createTransactionLock";
import { accountType, AccountType } from "../../accounts/type";
import { findAccount } from "../../accounts/resolvers/findAccount";
import { changeUserAccount } from "../../accounts/repositories/changeUserAccount";
import { deleteTransactionLock } from "../../transaction-lockers/repositories/deleteTransactionLock";
import { createTransactionRepository } from "../repositories/createTransaction";
import { findTransactionByIdRepository } from "../repositories/findTransactionById";
import { findTransactionByCodeRepository } from "../repositories/findTransactionByCode";
import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";
import { transactionType } from "../type";
import { notifyTransactionReceived } from "./transactionReceived";

type CreateTransactionArgs = {
  sender: string;
  receiver: string;
  amount: number;
  code: string;
};

type CreateTransactionResponse = {
  success: boolean;
  transaction: {
    _id: string;
    account: string;
    toAccount: string;
    amount: number;
    createdAt: Date;
  } | null;
  error: string | null;
  account: AccountType | null;
  targetAccount: AccountType | null;
};

export const makeTransaction = async ({
  sender,
  receiver,
  amount,
  code,
}: CreateTransactionArgs): Promise<CreateTransactionResponse> => {
  // validate if sender exists
  const findedSender = await findAccount(sender);

  if (!findedSender?._id) {
    return errorMessage("Account not found");
  }

  // validate transaction ammount
  if (amount < 0) {
    return errorMessage("Invalid amount");
  }

  const findedTransaction = await findTransactionByCodeRepository(code);

  if (findedTransaction) {
    return errorMessage("Transaction already exists");
  }

  // validated if receiver exists
  const findedReceiver = await findAccount(receiver);

  if (!findedReceiver?._id) {
    return errorMessage("Receiver not found");
  }

  // validate user account balance
  if (!findedSender.balance || findedSender.balance < amount) {
    return errorMessage("Insufficient balance");
  }

  // lock user transaction
  const lockResult = await createTransactionLock(sender, amount, receiver);

  if (!lockResult.success || !lockResult.insertedId) {
    return errorMessage(lockResult.error || "Transaction already in progress");
  }

  // change user account balance
  const senderBalance = await changeUserAccount(sender, -amount);

  // change toAccount balance
  const receiverBalance = await changeUserAccount(receiver, amount);

  // create transaction
  const transactionId = await createTransactionRepository({
    sender,
    senderBalanceAfter: senderBalance,
    receiver,
    receiverBalanceAfter: receiverBalance,
    amount,
    code,
  });

  // unlock user transaction
  await deleteTransactionLock(lockResult.insertedId);

  const transaction = await findTransactionByIdRepository(transactionId);

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  const updatedAccount = await findAccount(sender);
  const updatedToAccount = await findAccount(receiver);

  notifyTransactionReceived(updatedToAccount.email, {
    message: "You received a new transaction",
    amount,
    sender: updatedAccount.name,
  });

  return {
    success: true,
    transaction: {
      _id: transaction._id,
      account: transaction.account,
      toAccount: transaction.targetAccount,
      amount: transaction.amount,
      createdAt: transaction.createdAt,
    },
    error: null,
    targetAccount: updatedToAccount,
    account: updatedAccount,
  };
};

function errorMessage(error: string): CreateTransactionResponse {
  return {
    success: false,
    transaction: null,
    error,
    targetAccount: null,
    account: null,
  };
}

export const CreateTransactionInputType = new GraphQLInputObjectType({
  name: "CreateTransactionInput",
  fields: () => ({
    code: {
      type: GraphQLString,
    },
    sender: {
      type: new GraphQLNonNull(GraphQLString),
    },
    amount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    receiver: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export const CreateTransactionPayloadType = new GraphQLObjectType({
  name: "CreateTransactionPayload",
  fields: () => ({
    success: {
      type: GraphQLBoolean,
    },
    sender: {
      type: accountType,
    },
    transaction: {
      type: transactionType,
    },
    receiver: {
      type: accountType,
    },
    error: {
      type: GraphQLString,
    },
  }),
});

export const CreateTransaction: GraphQLFieldConfig<null, null> = {
  type: CreateTransactionPayloadType,
  description: "Create a new transaction",
  args: {
    input: {
      type: CreateTransactionInputType,
    },
  },
  resolve: async (_, args) => {
    const transaction = await makeTransaction(args.input);
    return transaction;
  },
};
