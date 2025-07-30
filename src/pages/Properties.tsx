import { propertiesColumns } from "@/components/tables/columns/propertiesColumns";
import DataTable from "@/components/tables/DataTable";
import { useGetPropertiesQuery } from "@/services/propertiesApi";
import Loading from "./Loading";
import CreateNewModal from "@/components/CreateNewModal";
import Error from "./Error";

const Properties = () => {
  const formInitialState = {
    address: "",
    rent: "",
    deposit: "",
  };
  const { data, isLoading, isError } = useGetPropertiesQuery([]);

  return (
    <section className="page-section">
      <div className="flex flex-row w-full justify-between ">
        <h2 className="text-xl font-semibold text-primary">Properties</h2>
        <CreateNewModal title="Property" formInitialState={formInitialState} />
      </div>
      <div className="body-text">
        {isError ? (
          <Error />
        ) : isLoading || !data?.length ? (
          <Loading title="" />
        ) : (
          <DataTable columns={propertiesColumns} data={data} />
        )}
      </div>
    </section>
  );
};

export default Properties;
