import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    currentPage: 0,
    sort: {
        type: 'rating',
        title: 'популярности'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId);
                state.currentPage = Number(action.payload.currentPage);
                state.sort = action.payload.sort;
            } else {
                state.categoryId = 0;
                state.currentPage = 0;
                state.sort = {
                    type: 'rating',
                    title: 'популярности'
                }
            }
        }
    },
})

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer