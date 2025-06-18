import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "../features/authSlice";

const baseURL = import.meta.env.VITE_JENGA_API_URL;
const apiKey = import.meta.env.VITE_JENGA_API_KEY;
const merchantCode = import.meta.env.VITE_JENGA_MERCHANT_CODE;
const consumerSecret = import.meta.env.VITE_JENGA_CUSTOMER_SECRET;

export const getJengaTokenApi = createApi({
  reducerPath: "getJengaTokenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Api-Key", apiKey);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: () => {
        const formData = new FormData();
        formData.append("merchantCode", merchantCode);
        formData.append("consumerSecret", consumerSecret);

        return {
          url: `/authenticate/merchant`,
          method: "POST",
          body: formData,
        };
      },
      async onQueryStarted({ dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          console.log(`jengaToken: ${data}`);

          dispatch(setToken(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});
