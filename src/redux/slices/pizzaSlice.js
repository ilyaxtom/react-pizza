import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
    const { sort, category, search, currentPage } = params;
    const { data } = await axios.get(`https://676ff962b353db80c3240e51.mockapi.io/pizza/items?page=${currentPage + 1}&limit=4${search}${sort}${category}`);

    if (!data.length) {
        return thunkApi.rejectWithValue('Пиццы пустые');
    }

    return thunkApi.fulfillWithValue(data);
});

const initialState = {
    items: [],
    status: 'loading',
};

const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            });
    },
})

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;