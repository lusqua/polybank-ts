import React, { Suspense } from "react";
import {
  graphql,
  useQueryLoader,
  usePreloadedQuery,
  PreloadedQuery,
} from "react-relay/hooks";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { listTransactionsQuery } from "./__generated__/listTransactionsQuery.graphql";

const ListTransactionsQueryDocument = graphql`
  query listTransactionsQuery {
    transactions {
      _id
      amount
      sender {
        name
      }
      receiver {
        name
      }
    }
  }
`;

export default function ListTransactions() {
  const [queryReference, loadQuery] = useQueryLoader<listTransactionsQuery>(
    ListTransactionsQueryDocument
  );

  React.useEffect(() => {
    loadQuery({});
  }, [loadQuery]);

  return (
    <div className="w-1/2 rounded-md border pb-4">
      <Suspense fallback={"Loading transactions..."}>
        {queryReference && (
          <TransactionsContent queryReference={queryReference} />
        )}
      </Suspense>
    </div>
  );
}

const TransactionsContent: React.FC<{
  queryReference: PreloadedQuery<listTransactionsQuery>;
}> = ({ queryReference }) => {
  const data = usePreloadedQuery<listTransactionsQuery>(
    ListTransactionsQueryDocument,
    queryReference
  );

  return (
    <Table>
      <TableCaption>A list of transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>From</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>To</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.transactions &&
          data.transactions.map((transaction) => (
            <TableRow key={transaction?._id}>
              <TableCell>{transaction?.sender?.name}</TableCell>
              <TableCell>{transaction?.amount}</TableCell>
              <TableCell>{transaction?.receiver?.name}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
