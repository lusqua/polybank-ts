import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import { GraphQLContext } from "../../context";

export const accountType = new GraphQLObjectType<
  Record<string, unknown>,
  GraphQLContext
>({
  name: "Account",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: GraphQLInt },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export type AccountType = {
  _id: string;
  name: string;
  balance?: number;
  email: string;
};
