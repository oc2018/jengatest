/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DashIcon from "@/icons/dashboard.svg?react";
import TenantsIcon from "@/icons/tenants.svg?react";
import PropertiesIcon from "@/icons/properties.svg?react";
import TxnsIcon from "@/icons/txns.svg?react";
import BankIcon from "@/icons/bank.svg?react";
import ExpensesIcon from "@/icons/expenses.svg?react";
import React, { useContext } from "react";

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

export function cleanData<T extends object>(obj: T): Partial<T> {
  const { createdAt, _id, __v, updatedAt, propertyAddress, ...rest } =
    obj as any;
  return rest;
}

export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatCurrency = (
  amount: number,
  display: DisplayMode = "none",
  style: Style,
  options?: Intl.NumberFormatOptions
): string => {
  if (display === "none") {
    const num = new Intl.NumberFormat("en-KE", options).format(amount);

    return num;
  }

  return new Intl.NumberFormat("en-KE", {
    style,
    currency: style === "currency" ? "KES" : undefined,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    currencyDisplay:
      display === "symbol" || display === "narrowSymbol"
        ? display
        : (display as "code" | "name"),
    ...options,
  }).format(amount);
};

export const formatDate = (
  date: Date | string | number,
  locale: string = "en-KE",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
): string => {
  const dt =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  return new Intl.DateTimeFormat(locale, options).format(dt);
};

export const formatDateISO = (date: Date | string | number): string => {
  const dt =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  return dt.toISOString().split("T")[0];
};

export const ConfirmContext = React.createContext<
  (opts: { title: string; description: string }) => Promise<boolean>
>(async () => false);

export const useConfirm = () => useContext(ConfirmContext);
