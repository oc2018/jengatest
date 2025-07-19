// vite-env.d.ts or globals.d.ts
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface User {
  name: string;
  emai: string;
  password: string;
  confirmPassword?: string;
}

type Tenant = {
  name: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
  property: string;
  propertyAddress?: string;
  _id?: string;
};

type Property = {
  address: string;
  rent: number;
  deposit: number;
  status: string;
  _id: string;
};

type Txn = {
  txnID: number;
  accountType: string;
  amount: number;
  propertyId: string;
  tenantId: string;
  propertyAddress: string;
  tenantName: string;
  _id: string;
  createdAt: string;
};

type Expense = {
  description: string;
  amount: number;
  pettyCashNo: number;
  createdAt: string;
  property: string;
  propertyAddress?: string;
  _id: string;
};

type DisplayMode = "symbol" | "code" | "name" | "none" | "narrowSymbol";

type Style = "decimal" | "currency" | "percent";
