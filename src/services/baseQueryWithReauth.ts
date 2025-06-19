import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";

import { setToken, logout } from "../features/authSlice";
import type { RootState } from "../app/store";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const apiBaseURL = import.meta.env.VITE_JENGA_ACCOUNT_API_URL;
const authBaseURL = import.meta.env.VITE_JENGA_API_URL;
const apiKey = import.meta.env.VITE_JENGA_API_KEY;
// const merchantCode = import.meta.env.VITE_JENGA_MERCHANT_CODE;
// const consumerSecret = import.meta.env.VITE_JENGA_CUSTOMER_SECRET;

console.log("token generation");

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseURL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.user.jengaToken?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Api-key", apiKey);
    headers.set("Content-Type", "applicatio/json");

    return headers;
  },
});

//wraper with re-auth

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  //expired token
  if (result.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).user.user.jengaToken
      .refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());

      return result;
    }

    //refresh

    const refreshBaseQuery = fetchBaseQuery({
      baseUrl: authBaseURL,
      headers: {
        "Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    const refreshResult = await refreshBaseQuery(
      {
        url: "/authenticate/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const data = refreshResult.data as {
        token: string;
        refreshToken: string;
        expiresIn: number;
      };
      //save updated
      api.dispatch(
        setToken({
          token: data.token,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
        })
      );

      //retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
