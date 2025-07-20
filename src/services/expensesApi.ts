import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_BASE_URL;

export const expensesApi = createApi({
  reducerPath: "expensesApi",
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
  tagTypes: ["Expenses"],
  endpoints: (builder) => ({
    getExpense: builder.query<Expense, void>({
      query: (id) => `/api/expenses${id}`,
    }),
    getExpenses: builder.query<Expense[], void>({
      query: () => `/api/expenses`,
      providesTags: ["Expenses"],
    }),
    createExpense: builder.mutation<Expense, { expenseData: Expense }>({
      query: ({ expenseData }) => ({
        url: `/api/expenses`,
        method: `POST`,
        body: expenseData,
      }),
      invalidatesTags: ["Expenses"],
    }),
    updateExpense: builder.mutation<
      Expense,
      { id: string; expenseData: Expense }
    >({
      query: ({ id, expenseData }) => ({
        url: `/api/expenses/${id}`,
        method: `PATCH`,
        body: expenseData,
      }),
      invalidatesTags: ["Expenses"],
    }),
    deleteExpense: builder.mutation<Expense, { id: string }>({
      query: ({ id }) => ({
        url: `/api/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetExpenseQuery,
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;
