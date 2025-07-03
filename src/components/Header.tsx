import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import Logout from "./logout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user?.user.name) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <header className="header">
      <div>
        <h2 className="text-2xl text-dark-500 font-semibold">
          {user?.user.name}
        </h2>
        <p className="text-base text-slate-500">Monitor your tenants here</p>
      </div>
      <div>
        <div className="flex gap-3 justify-center items-center">
          {/* <Search /> */}

          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
