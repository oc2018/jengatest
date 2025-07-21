import { Button } from "./ui/button";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { cn, sidebarLinks } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { CloseIcon } from "./CloseIcon";
import { OpenIcon } from "./OpenIcon";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative">
      <Button
        variant={"ghost"}
        className="cursor-pointer text-light-300 relative z-50 sm:hidden"
        onClick={() => setOpen((val) => !val)}
      >
        {open ? (
          <CloseIcon className="text-white z-250 svg-click-ignore w-5 h-5" />
        ) : (
          <OpenIcon className="text-primary z-250 svg-click-ignore w-5 h-5" />
        )}
      </Button>
      <div
        className={cn(
          "flex fixed top-0  left-0 w-full h-screen bg-primary flex-col justify-center sm:hidden",
          open ? "z-40" : "-z-10 hidden"
        )}
      >
        <div className="logo">
          <img src={logo} alt="logo" width={150} className="" />
        </div>
        <div>
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.route}
              to={link.route}
              onClick={() => setOpen(false)}
              className={""}
            >
              {({ isActive }) => (
                <p
                  className={cn(
                    "text-3xl text-center mb-3 ",
                    isActive ? "text-white" : "text-dark-100"
                  )}
                >
                  {link.text}
                </p>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileMenu;
