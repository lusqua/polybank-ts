import { useForm, Controller } from "react-hook-form";
import {
  graphql,
  GraphQLTaggedNode,
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { transferDrawerQuery } from "./__generated__/transferDrawerQuery.graphql";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { accountQuery } from "../routes/__generated__/accountQuery.graphql";
import { ReloadIcon } from "@radix-ui/react-icons";

const accountListQuery = graphql`
  query transferDrawerQuery {
    accounts {
      _id
      name
    }
  }
`;

type TransferDrawerProps = {
  accountQueryReference: PreloadedQuery<accountQuery>;
  accountQuery: GraphQLTaggedNode;
};

type FormData = {
  receiver: string;
  amount: string | number;
  sender: string;
  code: string;
};

const mutation = graphql`
  mutation transferDrawerMutation($input: CreateTransactionInput!) {
    CreateTransaction(input: $input) {
      success
      error
      transaction {
        _id
        sender {
          name
        }
        amount
        receiver {
          name
        }
      }
    }
  }
`;

export function TransferDrawer({
  accountQueryReference,
  accountQuery,
}: TransferDrawerProps) {
  const [queryReference, loadQuery] =
    useQueryLoader<transferDrawerQuery>(accountListQuery);
  const [commitMutation, isMutationInFlight] = useMutation(mutation);

  useEffect(() => {
    loadQuery({});
  }, [loadQuery]);

  const data = usePreloadedQuery<accountQuery>(
    accountQuery,
    accountQueryReference
  );

  const { handleSubmit, control, register } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    if (typeof data.amount === "string") data.amount = parseFloat(data.amount);
    data.code = new Date().getTime().toString();
    commitMutation({ variables: { input: data } });

    // lógica para processar a transação
  };

  return (
    <>
      {queryReference ? (
        <Dialog aria-describedby="transaction-drawer">
          <DialogTrigger className="w-full">
            <Button className="my-8 w-full bg-purple-500">
              Fazer transferencia
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-[95%] sm:max-w-lg"
            aria-describedby="transaction-description"
          >
            <DialogHeader>
              <DialogTitle className="text-left">
                Realizar transferencia
              </DialogTitle>
            </DialogHeader>
            <p id="transaction-description" className="sr-only">
              Preencha os detalhes da transação e clique em Confirmar transação
              para completar.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="receiver" className="text-left">
                Para quem
              </Label>
              <Controller
                name="receiver"
                control={control}
                render={({ field }) => (
                  <AccountSelect
                    queryReference={queryReference}
                    currentUserId={data.account?._id}
                    onChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="amount" className="text-left">
                Valor
              </Label>
              <div className="relative w-full">
                <Input
                  className="pl-9"
                  type="number"
                  id="amount"
                  {...register("amount", { required: true })}
                />
                <p className="absolute left-2 top-2 h-4 w-4 text-muted-foreground">
                  R$
                </p>
              </div>
              <Input
                type="hidden"
                {...register("sender")}
                value={data.account?._id}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-purple-500"
                  disabled={isMutationInFlight}
                >
                  {isMutationInFlight ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Confirmar transação"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}

const AccountSelect: React.FC<{
  queryReference: PreloadedQuery<transferDrawerQuery>;
  currentUserId?: string;
  onChange: (value: string) => void;
}> = ({ queryReference, currentUserId, onChange }) => {
  const data = usePreloadedQuery<transferDrawerQuery>(
    accountListQuery,
    queryReference
  );

  const accounts = data.accounts?.filter(
    (account) => account!._id !== currentUserId
  );

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {accounts && (
          <>
            {accounts.map((account) => (
              <SelectItem key={account!._id} value={account!._id}>
                {account!.name}
              </SelectItem>
            ))}
          </>
        )}
      </SelectContent>
    </Select>
  );
};
