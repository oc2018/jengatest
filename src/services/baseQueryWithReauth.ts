import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";

import { setToken, logout } from "../features/authSlice";
import type { RootState } from "../app/store";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const baseURL = import.meta.env.VITE_BASE_URL;

interface BaseQueryWithReauthApiResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).user.user?.jengaToken.token;
    if (accessToken) headers.set("Authorization", `Bearear ${accessToken}`);

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

    const refreshResult = await baseQuery(
      {
        url: "/api/jenga/refreshtoken",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { data } = refreshResult as BaseQueryWithReauthApiResponse;
      console.log("refresh token:", data);
      api.dispatch(
        setToken({
          token: data?.accessToken,
          refreshToken: data?.refreshToken,
          expiresIn: data?.expiresIn,
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
