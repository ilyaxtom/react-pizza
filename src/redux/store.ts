import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice.js';
import cart from './slices/cartSlice.js';
import pizza from './slices/pizzaSlice.js';
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();