import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    total: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem (state, action) {
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
        removeItem (state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        decrementItem (state, action) {
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

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.items.find(item => item.id === id)

export const { addItem, removeItem, removeAllItems, decrementItem } = cartSlice.actions;

export default cartSlice.reducer;