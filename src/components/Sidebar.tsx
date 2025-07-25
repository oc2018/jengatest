import { cn, sidebarLinks } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";
import Icon from "@/Icon";
import { Avatar, AvatarFallback } from "./ui/avatar";
import logo from "@/assets/logo.png";
import { useGetMeQuery } from "@/services/userApi";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/app/store";

const Sidebar = () => {
  // const { user } = useSelector((state: RootState) => state.user);
  const profile = localStorage.getItem("profile");
  const parsedProfile = profile ? JSON.parse(profile) : null;

  const userId = parsedProfile?.user.id || undefined;

  const skipGetme = !userId;
  const { data: me } = useGetMeQuery(userId, { skip: skipGetme });
  // console.log(me?.name);

  return (
    <div className="sidebar">
      <div>
        <div className="logo flex flex-col items-center">
          <img
            className="max-md:hidden"
            alt="logo"
            src={logo}
            width={150}
            height={150}
          />
          <img
            className="max-md:flex hidden"
            alt="logo"
            src={logo}
            width={60}
            height={60}
          />
          {/* <h1 className="md:flex hidden leading-4 text-4xl font-bold">Emirl</h1>
          <p className="md:flex hidden leading-3">Builders</p> */}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.route}
            to={link.route}
            className={({ isActive }) =>
              cn("link", isActive && "bg-primary rounded-lg shadow-sm")
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative size-5">
                  <Icon
                    name={link.icon}
                    className={cn(
                      "text-dark font-bold ",
                      isActive ? "brightness-0 invert " : ""
                    )}
                  />
                </div>
                <p className={cn("", isActive ? "text-white" : "text-dark")}>
                  {link.text}
                </p>
              </>
            )}
          </NavLink>
        ))}
      </div>
      <Link
        to={"/profile"}
        className="inline-flex items-center rounded-full justify-center  md:border max-md:gap-0 gap-2 m-0 p-1 cursor-pointer md:border-primary/50"
      >
        <div className="max-md:border p-0.5 rounded-full border-primary">
          <Avatar className=" rounded-full shrink-0 bg-primary/20 ">
            {/* <AvatarImage src=""/> */}
            <AvatarFallback className="flex items-center text-center justify-center font-bold text-white text-xl bg-primary">
              {me?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex pr-2 leading-2 flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{me?.name}</p>
          <p className="text-light-500 text-xs">{me?.email}</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
