import Loading from "@/pages/Loading";
import DataTable from "./tables/DataTable";
import { ministatementColumns } from "./tables/columns/ministatementColumns";

const Ministatement: React.FC<MiniStatementProps> = ({
  transactions,
  isLoading,
}) => {
  //   console.log(transactions, isLoading);
  return (
    <section className="">
      <div className="flex flex-row justify-between my-2">
        <div className="text-14-medium text-primary">Mini Statement</div>
        <button
          className="text-gray-500 text-12-medium p-0 m-0 cursor-pointer "
        >
          Get full statement
        </button>
      </div>
      <div className="overflow-auto">
        {isLoading ? (
          <Loading title="" />
        ) : (
          <>
            <DataTable columns={ministatementColumns} data={transactions} />
          </>
        )}
      </div>
    </section>
  );
};

export default Ministatement;
