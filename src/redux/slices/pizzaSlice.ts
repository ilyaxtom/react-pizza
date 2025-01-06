import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

type Pizza = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
}

export enum Status {
    LOADING = "loading",
    ERROR = "error",
    SUCCESS = "success",
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

export type SearchPizzaParams = {
    sort: string;
    category: string;
    search: string;
    currentPage: string;
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params, thunkApi) => {
        const { sort, category, search, currentPage } = params;
        const { data } = await axios.get<Pizza[]>(`https://676ff962b353db80c3240e51.mockapi.io/pizza/items?page=${currentPage + 1}&limit=4${search}${sort}${category}`);

        if (!data.length) {
            return thunkApi.rejectWithValue('Пиццы пустые');
        }

        return thunkApi.fulfillWithValue(data as Pizza[]);
    }
);

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.items = action.payload;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR;
                state.items = [];
            });
    },
})

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;