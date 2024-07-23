import {
  GraphQLTaggedNode,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";
import { accountQuery } from "../routes/__generated__/accountQuery.graphql";
import { Card, CardContent, CardTitle } from "./ui/card";

export default function AccountInfo({
  queryReference,
  query,
}: {
  queryReference: PreloadedQuery<accountQuery>;
  query: GraphQLTaggedNode;
}) {
  const data = usePreloadedQuery<accountQuery>(query, queryReference);

  return (
    <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center mt-8 sm:mt-0">
      <h1 className="text-2xl mb-4">Olá, {data.account?.name}</h1>
      <Card className="w-full sm:w-64 p-2 mt-4 m-auto sm:m-0">
        <CardTitle className="text-xl">Saldo</CardTitle>
        <CardContent className="p-2 text-2xl text-center">
          {data.account?.balance?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </CardContent>
      </Card>
    </div>
  );
}
