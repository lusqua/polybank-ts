import React, { Suspense } from "react";
import {
  graphql,
  useQueryLoader,
  usePreloadedQuery,
  PreloadedQuery,
} from "react-relay/hooks";
import { accountsQuery } from "./__generated__/accountsQuery.graphql";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const ListAccountsQueryDocument = graphql`
  query accountsQuery {
    accounts {
      _id
      name
      balance
    }
  }
`;

const ListAccounts: React.FC = () => {
  const [queryReference, loadQuery] = useQueryLoader<accountsQuery>(
    ListAccountsQueryDocument
  );

  React.useEffect(() => {
    loadQuery({});
  }, [loadQuery]);

  return (
    <div className="w-full rounded-md pb-4">
      <Suspense fallback={"Loading accounts..."}>
        {queryReference && <AccountsContent queryReference={queryReference} />}
      </Suspense>
    </div>
  );
};

const AccountsContent: React.FC<{
  queryReference: PreloadedQuery<accountsQuery>;
}> = ({ queryReference }) => {
  const data = usePreloadedQuery<accountsQuery>(
    ListAccountsQueryDocument,
    queryReference
  );

  return (
    <Table>
      <TableCaption>A list of registered accounts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.accounts && (
          <>
            {data.accounts.map((account) => (
              <TableRow key={account!._id}>
                <TableCell>{account!.name}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(account!.balance)}
                </TableCell>
                <TableCell className="text-purple-600">
                  <a href={`/account/${account!._id}`}>Ver mais</a>
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
};

export default ListAccounts;
