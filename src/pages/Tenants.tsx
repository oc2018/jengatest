import { tenantColumns } from "@/components/tables/columns/tenantColumns";
import DataTable from "@/components/tables/DataTable";
import { useGetTenantsQuery } from "@/services/tenantsApi";
import Loading from "./Loading";
import CreateNewModal from "@/components/CreateNewModal";
import { useGetPropertiesByIdsQuery } from "@/services/propertiesApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import Error from "./Error";

const Tenants = () => {
  const { data: tenants, isLoading, isError } = useGetTenantsQuery();

  const safeTenants = tenants ?? [];

  const propertyIds = safeTenants?.map((t) => t.property) ?? [];

  const {
    data: properties,
    isLoading: propertiesLoading,
    isFetching: propertiesFetching,
  } = useGetPropertiesByIdsQuery(propertyIds ?? skipToken, {
    skip: !propertyIds.length,
    refetchOnMountOrArgChange: true,
  });

  if (
    propertiesLoading ||
    propertiesFetching ||
    (propertiesFetching && !properties && properties)
  ) {
    return <Loading title="Tenants" />;
  }

  const tenantsData = safeTenants.map((t) => ({
    ...t,
    propertyAddress:
      properties?.find((p) => p?._id === t.property)?.address ?? "",
  }));

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
          <Error />
        ) : isLoading || !tenantsData?.length ? (
          <Loading title="" />
        ) : (
          <DataTable columns={tenantColumns} data={tenantsData ?? []} />
        )}
      </div>
    </section>
  );
};

export default Tenants;
