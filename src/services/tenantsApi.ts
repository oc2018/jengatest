import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_BASE_URL;

export const tenantApi = createApi({
  reducerPath: "tenantApi",
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
  tagTypes: ["Tenant"],
  endpoints: (builder) => ({
    getTenants: builder.query<Tenant[], void>({
      query: () => `/api/tenants`,
      providesTags: ["Tenant"],
    }),
    getTentant: builder.query({
      query: (id) => `/api/tenants/${id}`,
    }),
    createTenant: builder.mutation({
      query: (formData) => ({
        url: `api/tenants`,
        method: `POST`,
        body: formData,
      }),
      invalidatesTags: ["Tenant"],
    }),
    updateTenant: builder.mutation<Tenant, { id: string; tenantData: Tenant }>({
      query: ({ id, tenantData }) => ({
        url: `/api/tenants/${id}`,
        method: "PATCH",
        body: tenantData,
      }),
      invalidatesTags: ["Tenant"],
    }),
    deleteTenant: builder.mutation({
      query: (id) => ({
        url: `/api/tenants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tenant"],
    }),
  }),
});

export const {
  useGetTenantsQuery,
  useGetTentantQuery,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
  useCreateTenantMutation,
} = tenantApi;
