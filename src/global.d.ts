// vite-env.d.ts or globals.d.ts
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  _id?: string;
  avatarUrl?: url;
}

type Tenant = {
  name: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
  property: string;
  propertyAddress?: string;
  _id: string;
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

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

interface GetBalanceRequest {
  accountId: string;
  countryCode: string;
  fromDate?: string;
  toDate?: string;
}

interface BalanceItem {
  amount: string;
  type: string;
  currency?: string;
}

interface GetBalanceResponse {
  data: {
    balances: BalanceItem[];
    currency: string;
  };
}

interface ApiResponse<T> {
  status: number;
  data: T;
}

interface BalanceProps {
  amounts: BalanceItem[];
  currency: string;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

interface GetMiniStatementRequest {
  accountId: string;
  countryCode: string;
  fromDate: string;
  toDate: string;
}

interface StatementTransaction {
  amount: string;
  chequeNo: string | null;
  date: string;
  description: string;
  type: string;
}

interface GetMiniStatementResponse {
  code: number;
  data: {
    accountNumber: string;
    balance: string;
    currency: string;
    transactions: StatementTransaction[];
  };
  message: string;
  status: boolean;
}

interface MiniStatementProps {
  transactions: StatementTransaction[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

interface UserState {
  user: {
    name: string;
    email: string;
    _id: string;
  };
  jengaToken: {
    token: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
  };
}

type UserRes = {
  user: User;
  token: string;
};
interface SignInArgs {
  email: string;
  password: string;
}

interface SendMoneyFormData {
  data: {
    type: string;
    accountId: string;
    amount: number;
  };
  isMobile: boolean;
}

interface ActionProps {
  data: Tenant | Property | Expense;
  title: string;
}
