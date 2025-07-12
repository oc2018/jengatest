import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import Logout from "./logout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Search from "./Search";
const secret = import.meta.env.JWT_SECRET;

interface JwtPayload {
  name: string;
  exp: number;
  iat: number;
  userId: string;
  email: string;
}

const Header = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const nowSec = Math.floor(Date.now() / 1000);

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    } else {
      const decodedToken = jwtDecode<JwtPayload>(token, secret);
      // console.log(decodedToken.exp, nowSec);
      if (nowSec > decodedToken.exp!) {
        navigate("/auth");
      }
    }
  }, [token, nowSec, navigate]);

  return (
    <header className="header">
      <div>
        <h2 className="text-2xl text-dark-500 font-semibold">
          {user?.user.name}
        </h2>
        <p className="text-base text-slate-500">Monitor your tenants here</p>
      </div>
      <div>
        <div className="flex gap-5 justify-center items-center">
          <Search />

          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
