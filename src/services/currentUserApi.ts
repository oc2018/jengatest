import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

import { setUser } from "../features/authSlice";

const baseURL = import.meta.env.VITE_BASE_URL;

export const currentUserApi = createApi({
  reducerPath: `currentUserApi`,
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: `GET`,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.error("Failed to fetch current user", error);
        }
      },
    }),
  }),
});

export const { useGetMeQuery } = currentUserApi;
