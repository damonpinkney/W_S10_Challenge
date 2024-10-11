// state/ordersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch orders from the API
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await fetch('http://localhost:9009/api/pizza/history');
  const data = await response.json();
  return data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      // Handle fulfilled state
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add fetched orders to the state
        state.orders = action.payload;
      })
      // Handle rejected state
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
