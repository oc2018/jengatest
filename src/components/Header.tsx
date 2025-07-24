import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import Logout from "./logout";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Search from "./Search";
import MobileMenu from "./MobileMenu";
import { UserIcon } from "./UserIcon";

// const secret = import.meta.env.JWT_SECRET;

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

  const me = user?.user.name;

  useEffect(() => {
    if (!token || !me) {
      navigate("/auth");
      return;
    }
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      if (nowSec > decodedToken.exp!) {
        navigate("/auth");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Invalid JWT: ", error);
    }
  }, [token, nowSec, navigate, me]);

  return (
    <header className="header">
      <div className="flex flex-row items-center h-full justify-between">
        <Link to={"/profile"} className=" flex sm:hidden cursor-pointer ml-2 ">
          <UserIcon className="text-primary " />
        </Link>
        <div className="max-sm:hidden">
          <h2 className="text-2xl text-primary font-semibold">{me}</h2>
          <p className="text-base text-slate-500">Monitor your tenants here</p>
        </div>
      </div>
      <div>
        <div className="flex gap-5 justify-center items-center">
          <Search />
          <Logout className="" />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
