import { setUser } from "@/features/authSlice";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_BASE_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint !== "signIn" && endpoint !== "signUp") {
        const token = localStorage.getItem("token");

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  }),

  tagTypes: ["Me"],

  endpoints: (builder) => ({
    uploadImage: builder.mutation<{ url: string }, FormData>({
      query: (fileData) => ({
        url: `/api/uploads`,
        method: `POST`,
        body: fileData,
      }),
    }),
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

    signIn: builder.mutation<UserRes, SignInArgs>({
      query: (formData) => ({
        url: `/api/users/signin`,
        method: `POST`,
        body: formData,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token);
          localStorage.setItem("profile", JSON.stringify({ ...data }));

          dispatch(userApi.util.invalidateTags(["Me"]));

          // const getMePromise = await dispatch(
          //   userApi.endpoints.getMe.initiate(data.user.id)
          // );
          // console.log("Dispatched getMe, promise", getMePromise);
        } catch (error) {
          console.error("Sign-in failed", error);
        }
      },
      invalidatesTags: (result) => [{ type: "Me", id: result?.user._id }],
    }),
    getMe: builder.query<User[], string>({
      query: (_id) => ({
        url: `api/users/${_id}`,
        method: `GET`,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setUser(data));
        } catch (error) {
          console.error("Failed to fetch current user", error);
        }
      },
      providesTags: (result, error, id) => [{ type: "Me", id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useSignUpMutation,
  useSignInMutation,
  useGetMeQuery,
  useUploadImageMutation,
} = userApi;
