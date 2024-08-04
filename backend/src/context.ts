import DataLoader from "dataloader";
import { batchAccountsByIds } from "./modules/accounts/repositories/batchAccountsByIds";

export type ContextType = {
  dataloaders: {
    accountLoader: DataLoader<string, any>;
  };
};

export interface GraphQLContext {
  accountLoader: any;
}

export const getContext = () => {
  return {
    dataloaders: {
      accountLoader: accountLoader,
    },
  };
};

export const accountLoader = new DataLoader<string, any>((ids) =>
  batchAccountsByIds(ids)
);
