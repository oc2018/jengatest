import { cn, sidebarLinks } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import Icon from "@/Icon";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <div className="logo flex flex-col items-center">
          <h1 className="text-4xl">Miles</h1>
          <p className="md:flex hidden">Limited</p>
        </div>
      </div>
      <div className="flex flex-col gap-5">
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
      <div className="flex flex-row items-center rounded-full justify-center gap-2 border p-1 pr-4 cursor-pointer border-blue-200">
        <NavLink to={"/profile"}>
          <Avatar className="bg-primary/20 ">
            {/* <AvatarImage src=""/> */}
            <AvatarFallback className="font-bold text-white bg-primary">
              E
            </AvatarFallback>
          </Avatar>
        </NavLink>
        <div className="flex leading-2 flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">eric mutugi ndege</p>
          <p className="text-light-500 text-xs">eric@ericndege.com</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
