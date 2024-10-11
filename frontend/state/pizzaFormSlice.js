// state/pizzaFormSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders } from './ordersSlice';

export const createOrder = createAsyncThunk(
  'pizzaForm/createOrder',
  async (orderData, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:9009/api/pizza/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message);
      }
      // After successful order, fetch the updated orders
      dispatch(fetchOrders());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const pizzaFormSlice = createSlice({
  name: 'pizzaForm',
  initialState: {
    fullName: '',
    size: '',
    toppings: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setFullName(state, action) {
      state.fullName = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    toggleTopping(state, action) {
      const topping = action.payload;
      if (state.toppings.includes(topping)) {
        state.toppings = state.toppings.filter((t) => t !== topping);
      } else {
        state.toppings.push(topping);
      }
    },
    resetForm(state) {
      state.fullName = '';
      state.size = '';
      state.toppings = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
        // Reset the form upon successful submission
        state.fullName = '';
        state.size = '';
        state.toppings = [];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setFullName, setSize, toggleTopping, resetForm } = pizzaFormSlice.actions;

export default pizzaFormSlice.reducer;
