import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
    name: 'account',
    initialState: {
        searchQuery: '',
        searchResponse: [],
    },
    reducers: {
        onSearchQueryType: (state, action) => {
            state.searchQuery = action.payload.query
            state.searchResponse = action.payload.response
        },
    }
})

export default inputSlice.reducer
export const { onSearchQueryType } = inputSlice.actions