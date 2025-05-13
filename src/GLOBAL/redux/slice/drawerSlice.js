import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        showDrawer: false
    },
    reducers: {
        toggleDrawer: (state, action) => {
            state.showDrawer = action.payload
            // state.showDrawer = !state.showDrawer
        }
    }
})

export default drawerSlice.reducer
export const { toggleDrawer } = drawerSlice.actions