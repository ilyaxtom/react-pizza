import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../store'
import {getTotalPrice} from "../../utils/getTotalPrice";
import {getCartItems} from "../../utils/getCartItemsFromLS";

export type CartItem = {
    id: number;
    title: string
    price: number
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}

export interface CartSliceState {
    total: number;
    items: CartItem[];
}

const {items, total} = getCartItems();

const initialState: CartSliceState = {
    total,
    items,
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

            state.total = getTotalPrice(state.items);
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