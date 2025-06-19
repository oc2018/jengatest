import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

// const baseURL = import.meta.env.VITE_JENGA_ACCOUNT_API_URL;

export const jengaApi = createApi({
  reducerPath: "jengaApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getBalance: builder.query({
      query: () => ({
        url: `accounts/balances/KE/1100194977404`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBalanceQuery } = jengaApi;
