import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DashIcon from "@/icons/dashboard.svg?react";
import TenantsIcon from "@/icons/tenants.svg?react";
import PropertiesIcon from "@/icons/properties.svg?react";
import TxnsIcon from "@/icons/txns.svg?react";
import BankIcon from "@/icons/bank.svg?react";
import ExpensesIcon from "@/icons/expenses.svg?react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Icons = {
  DashIcon,
  TenantsIcon,
  PropertiesIcon,
  TxnsIcon,
  BankIcon,
  ExpensesIcon,
} as const;

export type IconName = keyof typeof Icons;

export interface SidebarLink {
  route: string;
  text: string;
  icon: IconName;
}

export const sidebarLinks: SidebarLink[] = [
  { route: "/", icon: "DashIcon", text: "Dashboard" },
  { route: "/tenants", icon: "TenantsIcon", text: "Tenants" },
  { route: "/properties", icon: "PropertiesIcon", text: "Properties" },
  { route: "/Transactions", icon: "TxnsIcon", text: "Transactions" },
  { route: "/bank", icon: "BankIcon", text: "Bank" },
  { route: "/expenses", icon: "ExpensesIcon", text: "Expenses" },
];
