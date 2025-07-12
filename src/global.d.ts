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
  phoneNumber: string;
  property: string;
  _id: string;
};

type Property = {
  address: string;
  rent: number;
  deposit: number;
  status: string;
  _id: string;
};
