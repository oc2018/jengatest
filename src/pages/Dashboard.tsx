// import { useGetUsersQuery } from "../services/userApi";
// import type { RootState } from "../app/store";
// import { useSelector } from "react-redux";
// import Logout from "../components/logout";
// import { useGetTokenQuery } from "../services/getJengaTokenApi";
// import { useGetBalanceQuery } from "../services/jengaApi";

import Feature from "@/components/Feature";

const Dashboard = () => {
  // const { user } = useSelector((state: RootState) => state.user);

  // const initalData = { accountNumber: "" };

  // console.log(user);

  // const { data } = useGetUsersQuery([]);
  // const { data } = useGetBalanceQuery([]);

  // const [result] = useGetTokenMutation();
  // const { data } = useGetTokenQuery([]);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   balance(formData);
  // };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: error</div>;

  // console.log(data?.accessToken);
  return (
    <section className="page-section">
      <div className="">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>
      <div className="body-text">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row gap-3">
            <Feature title="Revenue" icon="" value={28009} />
            <Feature title="Properties" icon="" value={4} />
            <Feature title="Tenants" icon="" value={4} />
          </div>
          <div className="border mt-3 border-primary rounded-xl min-h-64">
            charts
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
