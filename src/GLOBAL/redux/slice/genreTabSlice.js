import { createSlice } from "@reduxjs/toolkit";

const genreTabSlice = createSlice({
    name: 'genreTab',
    initialState: {
        activeGenreTab: 'ALL'
    },
    reducers: {
        setActiveGenreTab: (state, action) => {
            state.activeGenreTab = action.payload
        }
    }
})

export default genreTabSlice.reducer
export const { setActiveGenreTab } = genreTabSlice.actions