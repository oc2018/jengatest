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
      <div className="text-14-medium my-2 text-primary">Mini Statement</div>
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
