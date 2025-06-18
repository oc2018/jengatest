import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";

const baseURL = import.meta.env.VITE_JENGA_API_URL;
const apiKey = import.meta.env.VITE_JENGA_API_KEY;

export const jengaApi = createApi({
  reducerPath: "jengaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.user.token;

      console.log(`jengaApi ${token}`);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      headers.set("Api-Key", apiKey);

      return headers;
    },
  }),
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
