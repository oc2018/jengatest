import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { currentUserApi } from "./currentUserApi";

const baseURL = import.meta.env.VITE_BASE_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users`,
    }),
    signUp: builder.mutation({
      query: (formData) => ({
        url: `/users/signup`,
        method: `POST`,
        body: formData,
      }),
    }),
    signIn: builder.mutation({
      query: (formData) => ({
        url: `/users/signin`,
        method: `POST`,
        body: formData,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("profile", JSON.stringify({ ...data }));

          await dispatch(currentUserApi.endpoints.getMe.initiate(data.user.id));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useSignUpMutation, useSignInMutation } =
  userApi;
