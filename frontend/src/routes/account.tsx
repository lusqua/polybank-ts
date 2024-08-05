import { useQueryLoader } from "react-relay";
import { useParams } from "react-router-dom";
import { graphql } from "relay-runtime";
import React from "react";
import AccountInfo from "../components/accountInfo";
import { accountQuery } from "./__generated__/accountQuery.graphql";
import AccountTransactions from "../components/accountTransactions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { TransferDrawer } from "../components/transferDrawer";
import TransactionNotification from "../components/transactionNotification";

const queryAccount = graphql`
  query accountQuery($id: String!) {
    accountTransactions(accountId: $id) {
      _id
      sender {
        _id
        name
      }
      amount
      createdAt
      receiver {
        _id
        name
      }
    }
    account(id: $id) {
      _id
      name
      balance
      email
    }
  }
`;

export default function Account() {
  const { id } = useParams<{ id: string }>();

  const [queryReference, loadQuery] =
    useQueryLoader<accountQuery>(queryAccount);

  React.useEffect(() => {
    if (id) {
      loadQuery({ id });
    }
  }, [id, loadQuery]);

  return (
    <div className="w-full sm:w-2/3 m-auto py-4 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-purple-200 hover:text-purple-500"
            >
              Início
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-purple-500">Conta</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {queryReference && (
        <>
          <AccountInfo queryReference={queryReference} query={queryAccount} />

          <TransferDrawer
            accountQueryReference={queryReference}
            accountQuery={queryAccount}
          />

          <AccountTransactions
            queryReference={queryReference}
            query={queryAccount}
          />

          <TransactionNotification
            queryReference={queryReference}
            query={queryAccount}
          />
        </>
      )}
    </div>
  );
}
