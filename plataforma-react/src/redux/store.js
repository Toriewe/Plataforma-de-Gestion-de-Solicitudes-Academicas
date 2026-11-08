
import { configureStore } from '@reduxjs/toolkit';
import filtroReducer from './filtroSlice.js';

export const store = configureStore({
  reducer: {
    filtro: filtroReducer,
  },
});
