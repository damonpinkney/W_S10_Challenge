import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';
import filterReducer from './filterSlice';
import pizzaFormReducer from './pizzaFormSlice';

const rootReducer = {
  orders: ordersReducer,
  filter: filterReducer,
  pizzaForm: pizzaFormReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export const resetStore = () => configureStore({
  reducer: rootReducer,
});

export default store;