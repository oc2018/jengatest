import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_BASE_URL;

export const propertiesApi = createApi({
  reducerPath: "propertiesApi",
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
  tagTypes: ["Property"],
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => `/api/properties`,
      providesTags: ["Property"],
    }),
    createProperty: builder.mutation<Property, { propertyData: Property }>({
      query: ({ propertyData }) => ({
        url: `/api/properties`,
        method: `POST`,
        body: propertyData,
      }),
      invalidatesTags: ["Property"],
    }),
    updateProperties: builder.mutation<
      Property,
      { id: string; propertyData: Property }
    >({
      query: ({ id, propertyData }) => ({
        url: `api/properties/${id}`,
        method: "PATCH",
        body: propertyData,
      }),
      invalidatesTags: ["Property"],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useUpdatePropertiesMutation,
  useCreatePropertyMutation,
} = propertiesApi;
