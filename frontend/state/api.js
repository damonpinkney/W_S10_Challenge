// state/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api' }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrderHistory: builder.query({
      query: () => '/pizza/history',
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/pizza/order',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { useGetOrderHistoryQuery, useCreateOrderMutation } = apiSlice;
