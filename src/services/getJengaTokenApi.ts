import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "../features/authSlice";

const baseURL = import.meta.env.VITE_BASE_URL;

export const getJengaTokenApi = createApi({
  reducerPath: "getJengaTokenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    getToken: builder.query({
      query: () => {
        return {
          url: `api/jenga/token`,
          method: "GET",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;

          dispatch(
            setToken({
              token: data.data.accessToken,
              refreshToken: data.data.refreshToken,
              expiresIn: data.data.expiresIn,
            })
          );
        } catch (error) {
          console.error("Token fetch failed", error);
        }
      },
    }),
  }),
});

export const { useGetTokenQuery } = getJengaTokenApi;
