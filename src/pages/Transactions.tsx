import { txnsColumns } from "@/components/tables/columns/txnsColumns";
import DataTable from "@/components/tables/DataTable";
import { useGetTxnsQuery } from "@/services/txnsApi";
import Loading from "./Loading";
import Error from "./Error";
import { useGetPropertiesByIdsQuery } from "@/services/propertiesApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useGetTenantsByIdsQuery } from "@/services/tenantsApi";

const Transactions = () => {
  const { data: txns, isLoading, isError } = useGetTxnsQuery();

  const safeTxns = txns ?? [];

  const propertyIds = safeTxns.map((t) => t.propertyId) ?? [];
  const tenantIds = safeTxns.map((t) => t.tenantId) ?? [];

  const {
    data: properties,
    isLoading: propertiesLoading,
    isFetching: propertiesFetching,
  } = useGetPropertiesByIdsQuery(propertyIds ?? skipToken, {
    skip: !propertyIds.length,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: tenants,
    isLoading: tenantsIsLoading,
    isFetching: tenantsIsFetching,
  } = useGetTenantsByIdsQuery(tenantIds ?? skipToken, {
    skip: !tenantIds.length,
    refetchOnMountOrArgChange: true,
  });

  if (
    propertiesLoading ||
    tenantsIsLoading ||
    tenantsIsFetching ||
    propertiesFetching ||
    (propertiesFetching && !properties && properties) ||
    (tenantsIsFetching && !tenants && tenants)
  ) {
    return <Loading title="Transactions" />;
  }

  const txnsData = safeTxns.map((t) => ({
    ...t,
    propertyAddress:
      properties?.find((p) => p?._id === t.propertyId)?.address ?? "",
    tenantName: tenants?.find((i) => i?._id === t.tenantId)?.name ?? "",
  }));

  return (
    <section className="page-section">
      <div className="">
        <h2 className="text-xl font-semibold text-primary">Transactions</h2>
      </div>
      <div className="body-text">
        {isError ? (
          <Error />
        ) : isLoading ? (
          <Loading title="" />
        ) : (
          <DataTable columns={txnsColumns} data={txnsData} />
        )}
      </div>
    </section>
  );
};

export default Transactions;
