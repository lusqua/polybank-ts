import ListAccounts from "../components/accounts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../components/ui/breadcrumb";

export default function Home() {
  return (
    <div className="w-full sm:w-2/3 m-auto py-4 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-purple-500">
              Início
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl text-left mb-16">Contas</h1>

      <ListAccounts />
    </div>
  );
}
