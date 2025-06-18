import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

import { setUser } from "../features/authSlice";

const baseURL = import.meta.env.VITE_BASE_URL;

export const currentUserApi = createApi({
  reducerPath: `currentUserApi`,
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: `GET`,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setUser(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});
