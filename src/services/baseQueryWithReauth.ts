import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";

import { setToken, logout } from "../features/authSlice";
import type { RootState } from "../app/store";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const baseURL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  // prepareHeaders: (headers, { getState }) => {
  //   const state = getState() as RootState;
  //   console.log(`state ${state}`);
  //   const token = (getState() as RootState).user.user.jengaToken.token;

  //   if (token) {
  //     headers.set("Authorization", `Bearer ${token}`);
  //   }

  //   headers.set("Api-key", apiKey);
  //   headers.set("Content-Type", "applicatio/json");

  //   return headers;
  // },
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
      baseUrl: baseURL,
      // headers: {
      //   "Api-Key": apiKey,
      //   "Content-Type": "application/json",
      // },
    });

    const refreshResult = await refreshBaseQuery(
      {
        url: "api/jenga/refreshtoken",
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
