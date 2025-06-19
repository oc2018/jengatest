import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { currentUserApi } from "./currentUserApi";

const baseURL = import.meta.env.VITE_BASE_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint !== "signIn" && endpoint !== "signUp") {
        const token = localStorage.getItem("token");

        console.log(token);

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/api/users`,
    }),
    signUp: builder.mutation({
      query: (formData) => ({
        url: `/api/users/signup`,
        method: `POST`,
        body: formData,
      }),
    }),
    signIn: builder.mutation({
      query: (formData) => ({
        url: `/api/users/signin`,
        method: `POST`,
        body: formData,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("profile", JSON.stringify({ ...data }));

          await dispatch(currentUserApi.endpoints.getMe.initiate(data.user.id));
        } catch (error) {
          console.error("Sign-in failed", error);
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useSignUpMutation, useSignInMutation } =
  userApi;
