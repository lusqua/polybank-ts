import ListTransactions from "../components/listTransactions";

export default function Transactions() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-2/3">
        <h1 className="text-3xl text-left">Transactions</h1>
      </div>
      <ListTransactions />
    </div>
  );
}
