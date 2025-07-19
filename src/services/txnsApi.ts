import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_BASE_URL;

export const txnsApi = createApi({
  reducerPath: "txnsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);

        return headers;
      }
    },
  }),
  tagTypes: ["Txns"],
  endpoints: (builder) => ({
    getTxns: builder.query<Txn[], void>({
      query: () => `/api/txns`,
      providesTags: ["Txns"],
    }),
  }),
});

export const { useGetTxnsQuery } = txnsApi;
