import { useGetTokenQuery } from "@/services/getJengaTokenApi";
import {
  useGetBalanceMutation,
  useGetMiniStatementMutation,
} from "@/services/jengaApi";
import { useEffect, useState } from "react";

import Balance from "@/components/Balance";
import Ministatement from "@/components/Ministatement";

const Bank: React.FC = () => {
  const { data: tokenQuery } = useGetTokenQuery();
  const [amounts, setAmounts] = useState<BalanceItem[]>([]);
  const [transactions, setTransactions] = useState<StatementTransaction[]>([]);
  const [currency, setCurrency] = useState("");
  const formData: GetBalanceRequest = {
    accountId: "1100194977404",
    countryCode: "KE",
    fromDate: "2025-01-01",
    toDate: "2025-06-25",
  };
  const [getBalance, { isLoading, error }] = useGetBalanceMutation();
  const [getMiniStatement, { isLoading: MiniIsLoading, error: MiniError }] =
    useGetMiniStatementMutation();

  useEffect(() => {
    const fetchBalance = async () => {
      if (tokenQuery?.accessToken) {
        try {
          const res = await getBalance(formData).unwrap();
          setAmounts(res.data.balances);
          setCurrency(res.data.currency);
          const response = await getMiniStatement(formData).unwrap();
          setTransactions(response.data?.transactions);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenQuery, getBalance]);
  return (
    <section className="page-section">
      <div className="">
        <h2 className="text-xl font-semibold text-primary">Bank</h2>
      </div>
      <div className="flex py-1 w-full flex-col ">
        <Balance
          amounts={amounts}
          currency={currency}
          isLoading={isLoading}
          error={error}
        />
        <div className="">
          <Ministatement
            transactions={transactions}
            isLoading={MiniIsLoading}
            error={MiniError}
          />
        </div>
      </div>
    </section>
  );
};

export default Bank;
