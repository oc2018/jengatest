import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen  w-full flex-row">
      <Sidebar />
      <main className="container">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
