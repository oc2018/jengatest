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

    getProperty: builder.query({
      query: (id) => `/api/properties/${id}`,
    }),

    GetPropertiesByIds: builder.query<Property[], string[]>({
      queryFn: async (ids, _queryApi, _extra, baseQuery) => {
        const results = await Promise.all(
          ids.map((id) => baseQuery({ url: `/api/properties/${id}` }))
        );
        return { data: results.map((r) => r.data as Property) };
      },
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

    deleteProperty: builder.mutation({
      query: (id) => `/api/properties/${id}`,
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useUpdatePropertiesMutation,
  useCreatePropertyMutation,
  useGetPropertyQuery,
  useGetPropertiesByIdsQuery,
} = propertiesApi;
