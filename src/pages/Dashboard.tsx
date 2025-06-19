// import { useGetUsersQuery } from "../services/userApi";
import type { RootState } from "../app/store";
import { useSelector } from "react-redux";
import Logout from "../components/logout";
import { useGetBalanceQuery } from "../services/jengaApi";
import { useEffect } from "react";
import { useGetTokenMutation } from "../services/getJengaTokenApi";

const merchantCode = import.meta.env.VITE_JENGA_MERCHANT_CODE;
const consumerSecret = import.meta.env.VITE_JENGA_CUSTOMER_SECRET;

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [getToken] = useGetTokenMutation();
  const token = useSelector(
    (state: RootState) => state.user.user.jengaToken.token
  );

  // const initalData = { accountNumber: "" };

  const formData = new FormData();
  formData.append("merchantCode", merchantCode);
  formData.append("consumerSecret", consumerSecret);

  useEffect(() => {
    if (!token) getToken(formData);
  }, [token]);

  console.log(user);

  // const { data, error, isLoading } = useGetUsersQuery([]);
  const { data } = useGetBalanceQuery([]);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   balance(formData);
  // };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: error</div>;

  console.log(data);
  return (
    <div>
      <Logout />
      <form className="w-full">
        {/* <input
          placeholder="Account Number"
          className="w-full border border-gray-400 rounded-xl px-3 py-2 mb-3"
          value={formData.accountNumber}
          onChange={(e) =>
            setFormData({ ...formData, accountNumber: e.target.value })
          }
        /> */}
        <button className="w-full">check balance</button>
      </form>
    </div>
  );
};

export default Dashboard;
