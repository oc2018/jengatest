import { tenantColumns } from "@/components/tables/columns/tenantColumns";
import DataTable from "@/components/tables/DataTable";
import { useGetTenantsQuery } from "@/services/tenantsApi";
import Loading from "./Loading";
import CreateNewModal from "@/components/CreateNewModal";

const Tenants = () => {
  const { data, isLoading, isError } = useGetTenantsQuery();
  const formInitialState = {
    name: "",
    email: "",
    idNumber: "",
    phoneNumber: "",
    property: "",
  };

  return (
    <section className="page-section">
      <div className="flex flex-row w-full justify-between ">
        <h2 className="text-xl font-semibold text-primary">Tenants</h2>
        <CreateNewModal title="Tenant" formInitialState={formInitialState} />
      </div>
      <div className="body-text">
        {isError ? (
          <>404</>
        ) : isLoading ? (
          <Loading />
        ) : (
          <DataTable columns={tenantColumns} data={data ?? []} />
        )}
      </div>
    </section>
  );
};

export default Tenants;
