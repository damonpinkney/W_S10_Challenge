import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk('pizzaForm/createOrder', async (order, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:9009/api/pizza/order', order);
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.status = 'succeeded';
        state.fullName = '';
        state.size = '';
        state.toppings = [];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || action.error.message;
      });
  },
});

export const { setFullName, setSize, toggleTopping } = pizzaFormSlice.actions;
export default pizzaFormSlice.reducer;
