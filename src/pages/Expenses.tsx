import CreateNewModal from "@/components/CreateNewModal";
import { useGetExpensesQuery } from "@/services/expensesApi";
import Error from "./Error";
import Loading from "./Loading";
import DataTable from "@/components/tables/DataTable";
import { expensesColumns } from "@/components/tables/columns/expensesColumns";
import { useGetPropertiesByIdsQuery } from "@/services/propertiesApi";
import { skipToken } from "@reduxjs/toolkit/query/react";

const Expenses = () => {
  const formInitialState = {
    description: "",
    amount: "",
    property: "",
  };

  const { data: expenses, isLoading, isError } = useGetExpensesQuery();

  const safeExpenses = expenses ?? [];

  const propertyIds = safeExpenses.map((p) => p.property) ?? [];

  const { data: properties } = useGetPropertiesByIdsQuery(
    propertyIds ?? skipToken,
    { skip: !propertyIds.length, refetchOnMountOrArgChange: true }
  );

  const expenseData = safeExpenses?.map((p) => ({
    ...p,
    propertyAddress: properties?.find((i) => i?._id === p.property)?.address,
  }));

  return (
    <section className="page-section">
      <div className="flex flex-row w-full justify-between ">
        <h2 className="text-xl font-semibold text-primary">Expenses</h2>
        <CreateNewModal
          title="Expenditure"
          formInitialState={formInitialState}
        />
      </div>
      <div className="body-text">
        {isError ? (
          <Error />
        ) : isLoading || expenseData.length === 0 ? (
          <Loading title="" />
        ) : (
          <DataTable columns={expensesColumns} data={expenseData} />
        )}
      </div>
    </section>
  );
};

export default Expenses;
