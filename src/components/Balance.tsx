import Error from "@/pages/Error";
import Loading from "@/pages/Loading";
import clsx from "clsx";

const Balance: React.FC<BalanceProps> = ({
  amounts,
  currency,
  isLoading,
  error,
}) => {
  return (
    <div className="flex relative w-full ">
      {error && <Error />}
      {isLoading ? (
        <Loading title="" />
      ) : (
        amounts.map((amount, index) => (
          <div
            key={index}
            className="flex p-3 gap-3 mr-3 max-w-xs justify-between rounded-xl w-full flex-col border border-primary"
          >
            <div className="flex gap-3 justify-between">
              <div className="text-14-medium">{currency}</div>
              <div
                className={clsx("text-14-medium", {
                  "text-primary": amount.type === "Current",
                  "text-green": amount.type !== "Current",
                })}
              >
                {amount.type}
              </div>
            </div>
            <div
              className={clsx("text-3xl text-green text-center font-bold", {
                "text-primary": amount.type === "Current",
                "text-green": amount.type !== "urrent",
              })}
              key={index}
            >
              {amount.amount}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Balance;
