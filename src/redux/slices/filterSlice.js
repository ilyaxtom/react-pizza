import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sort: {
        type: 'rating',
        title: 'популярности'
    }
}

export const counterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        }
    },
})

export const { setCategoryId, setSort } = counterSlice.actions

export default counterSlice.reducer