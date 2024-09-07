// frontend/state/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza' }),
  endpoints: (builder) => ({
    getHistory: builder.query({
      query: () => '/history',
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/order',
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const { useGetHistoryQuery, useCreateOrderMutation } = apiSlice;
