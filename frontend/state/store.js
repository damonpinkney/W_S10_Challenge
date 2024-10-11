// state/store.js
import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';
import pizzaFormReducer from './pizzaFormSlice';
import filterReducer from './filterSlice';

const createStore = () => configureStore({
  reducer: {
    orders: ordersReducer,
    pizzaForm: pizzaFormReducer,
    filter: filterReducer,
  },
});

export const resetStore = createStore;

const store = createStore();

export default store;
