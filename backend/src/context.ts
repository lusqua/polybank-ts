import DataLoader from "dataloader";
import { batchAccountsByIds } from "./modules/accounts/repositories/batchAccountsByIds";

export interface GraphQLContext {
  accountLoader: any;
}

export const accountLoader = new DataLoader<string, any>((ids) =>
  batchAccountsByIds(ids)
);
