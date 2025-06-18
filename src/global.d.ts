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
