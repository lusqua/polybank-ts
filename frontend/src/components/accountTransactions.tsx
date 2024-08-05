import {
  GraphQLTaggedNode,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";
import { accountQuery } from "../routes/__generated__/accountQuery.graphql";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function AccountTransactions({
  queryReference,
  query,
}: {
  queryReference: PreloadedQuery<accountQuery>;
  query: GraphQLTaggedNode;
}) {
  const data = usePreloadedQuery<accountQuery>(query, queryReference);

  const forMe = (Account: { _id: string; name: string }): string => {
    return Account?._id === data.account?._id ? "Minha conta" : Account?.name;
  };

  return (
    <Table>
      <TableCaption>Movimentações da conta.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>De</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Para</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.accountTransactions?.map((transaction) => (
          <TableRow key={transaction?._id}>
            <TableCell>{forMe(transaction!.sender)}</TableCell>
            <TableCell>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(transaction!.amount)}
            </TableCell>
            <TableCell>{forMe(transaction!.receiver)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
