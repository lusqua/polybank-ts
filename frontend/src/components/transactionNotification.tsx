import React from "react";
import {
  graphql,
  GraphQLTaggedNode,
  PreloadedQuery,
  usePreloadedQuery,
  useSubscription,
} from "react-relay/hooks";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

import { accountQuery } from "../routes/__generated__/accountQuery.graphql";

const TRANSACTION_RECEIVED_SUBSCRIPTION = graphql`
  subscription transactionNotificationSubscription($email: String!) {
    transactionReceived(email: $email) {
      message
      amount
      sender
    }
  }
`;

const TransactionNotification: React.FC<{
  queryReference: PreloadedQuery<accountQuery>;
  query: GraphQLTaggedNode;
  refetch: () => void;
}> = ({ queryReference, query, refetch }) => {
  const data = usePreloadedQuery<accountQuery>(query, queryReference);

  useSubscription({
    subscription: TRANSACTION_RECEIVED_SUBSCRIPTION,
    variables: { email: data.account?.email },
    onNext: (response) => {
      const transaction = response.transactionReceived;
      const amountFormatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(transaction.amount);
      toast(`Você recebeu ${amountFormatted} de ${transaction.sender}`);
      refetch();
    },
  });

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default TransactionNotification;
