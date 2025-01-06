import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export enum SortTypes {
    RATING = 'rating',
    PRICE = 'price',
    TITLE = 'title'
}

export type SortItem = {
    type: SortTypes;
    title: string;
}

interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: SortItem;
}

const initialState: FilterSliceState = {
    searchValue: "",
    categoryId: 0,
    currentPage: 0,
    sort: {
        type: SortTypes.RATING,
        title: 'популярности'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<SortItem>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId);
                state.currentPage = Number(action.payload.currentPage);
                state.sort = action.payload.sort;
            } else {
                state.categoryId = 0;
                state.currentPage = 0;
                state.sort = {
                    type: SortTypes.RATING,
                    title: 'популярности'
                }
            }
        }
    },
})

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer;