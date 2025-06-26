// import { useGetUsersQuery } from "../services/userApi";
// import type { RootState } from "../app/store";
// import { useSelector } from "react-redux";
import Logout from "../components/logout";
import { useGetTokenQuery } from "../services/getJengaTokenApi";
// import { useGetBalanceQuery } from "../services/jengaApi";

const Dashboard = () => {
  // const { user } = useSelector((state: RootState) => state.user);

  // const initalData = { accountNumber: "" };

  // console.log(user);

  // const { data } = useGetUsersQuery([]);
  // const { data } = useGetBalanceQuery([]);

  // const [result] = useGetTokenMutation();
  const { data } = useGetTokenQuery([]);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   balance(formData);
  // };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: error</div>;

  console.log(data?.accessToken);
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
