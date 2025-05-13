import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        accountPurchases: [],
        messages: [],
        FAQs: [],
        profile: {
            first_name:""
        }
    },
    reducers: {
        getPurchases: (state, action) => {
            state.accountPurchases = action.payload
        },

        getMessages: (state, action) => {
            state.messages = action.payload
        },

        getFAQs: (state, action) => {
            state.FAQs = action.payload
        },

        setProfile: (state, action) => {
            state.profile = action.payload
        }
    }
})

export default accountSlice.reducer
export const { getPurchases, getMessages, getFAQs, setProfile } = accountSlice.actions