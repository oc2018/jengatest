import { propertiesColumns } from "@/components/tables/columns/propertiesColumns";
import DataTable from "@/components/tables/DataTable";
import { useGetPropertiesQuery } from "@/services/propertiesApi";
import Loading from "./Loading";
import CreateNewModal from "@/components/CreateNewModal";

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
        <h2 className="text-xl font-semibold">Properties</h2>
        <CreateNewModal title="Property" formInitialState={formInitialState} />
      </div>
      <div className="body-text">
        {isError ? (
          <>404</>
        ) : isLoading ? (
          <Loading />
        ) : (
          <DataTable columns={propertiesColumns} data={data} />
        )}
      </div>
    </section>
  );
};

export default Properties;
