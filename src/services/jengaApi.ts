// import type { RootState } from "@/app/store";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
// import { baseQueryWithReauth } from "./baseQueryWithReauth";

// const baseURL = import.meta.env.VITE_BASE_URL;

// const baseQuery = fetchBaseQuery({
//   baseUrl: baseURL,
//   prepareHeaders: (headers, { getState }) => {
//     const accessToken = (getState() as RootState).user.user?.jengaToken.token;
//     if (accessToken) headers.set("Authorization", `Bearear ${accessToken}`);

//     return headers;
//   },
// });

export const jengaApi = createApi({
  reducerPath: "jengaApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getBalance: builder.mutation<GetBalanceResponse, GetBalanceRequest>({
      query: (formData) => ({
        url: `/api/jenga/balance`,
        method: "POST",
        body: formData,
      }),
    }),
    getMiniStatement: builder.mutation<
      GetMiniStatementResponse,
      GetBalanceRequest
    >({
      query: (formData) => ({
        url: `/api/jenga/ministatement`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetBalanceMutation, useGetMiniStatementMutation } = jengaApi;
