import { formatCurrency } from "@/lib/utils";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

interface FeatureProps {
  title: string;
  icon: string;
  value: number;
}

const Feature: React.FC<FeatureProps> = ({ title, icon, value }) => {
  return (
    <Link
      to={title !== "Revenue" ? `/${title}` : "/"}
      className="flex flex-col max-w-xs w-full border border-primary p-3 rounded-xl"
    >
      <div className="flex justify-between">
        <div className="text-primary text-14-medium">{title}</div>
        <div className="text-primary text-14-medium">{icon}</div>
      </div>
      <div
        className={clsx("text-4xl text-center font-bold ", {
          "text-green": title === "Revenue",
          "text-primary": title !== "Revenue",
        })}
      >
        {title === "Revenue"
          ? formatCurrency(value, "narrowSymbol", "decimal")
          : value}
      </div>
    </Link>
  );
};

export default Feature;
