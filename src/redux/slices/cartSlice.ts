import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../store'

export type CartItem = {
    id: number;
    title: string
    price: number
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}

interface CartSliceState {
    total: number;
    items: CartItem[];
}

const initialState: CartSliceState = {
    total: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem (state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(item => item.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.total = state.items.reduce((accumulator, item) => (accumulator + item.price * item.count), 0);
        },
        removeItem (state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        decrementItem (state, action: PayloadAction<number>) {
            const findItem = state.items.find(item => item.id === action.payload);

            if (findItem) {
                findItem.count--;
            }
        },
        removeAllItems (state) {
            state.items = [];
            state.total = 0;
        }
    }
})

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find(item => item.id === id)

export const { addItem, removeItem, removeAllItems, decrementItem } = cartSlice.actions;

export default cartSlice.reducer;