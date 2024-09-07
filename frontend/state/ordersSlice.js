// frontend/state/ordersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sizeFilter: 'All',
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSizeFilter(state, action) {
      state.sizeFilter = action.payload;
    },
    addOrder(state, action) {
      state.orders.push(action.payload);
    },
  },
});

export const { setSizeFilter, addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
