import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    isAuthenticated: false,
    // token: null,
    redirectTo: null,
    isValid: false,
    isLoading: false
  },

  reducers: {
    isValidReducer: (state, action) => {
      state.isValid = action.payload
    },
    isLoadingReducer: (state, action) => {
      state.isLoading = action.payload
    },
    isAuthenticatedReducer: (state, action) => {
      state.isAuthenticated = action.payload
      window.localStorage.setItem('isAuthenticated', JSON.stringify(action.payload));
    },
    redirectReducer: (state, action) => {
      state.redirectTo = action.payload
      window.localStorage.setItem('redirectTo', JSON.stringify(action.payload));
    }
  },

})

export default authSlice.reducer;
export const { 
  isValidReducer,
  isLoadingReducer,
  isAuthenticatedReducer,
  redirectReducer
} = authSlice.actions

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     email: "",
//     error: false,
//     loading: false
//   },

  // reducers: {
  //   generateOTP_begin: (state) => {
  //     state.loading = true;
  //     state.error = false;
  //   },
  //   generateOTP_success: (state, action) => {
  //     state.email = action.payload;
  //     state.loading = false;
  //     // I set email in local storage so that even if user refreshes OTPpage
  //     // the data ll remain in state and he doesnt need to re-enter email address
  //     localStorage.setItem("afri_email", action.payload.email);
  //     localStorage.setItem("afri_mobile_number", action.payload.mobileNumber);
  //   },
  //   generateOTP_error: (state) => {
  //     state.loading = false;
  //     state.error = true;
  //   },
  //   validateOTP_begin: (state) => {
  //     state.loading = true;
  //     state.error = false;
  //   },
  //   validateOTP_success: (state, action) => {
  //     state.email = action.payload;
  //     state.loading = false;
  //     // I remove users email from localStorage after OTP is successfull
  //     // localStorage.removeItem("email");
  //   },
  //   validateOTP_error: (state) => {
  //     state.loading = false;
  //     state.error = true;
  //   },
  //   loginUser_statrt: (state) => { }
  // }
// });


// export const {
//   generateOTP_begin,
//   generateOTP_success,
//   generateOTP_error,
//   validateOTP_begin,
//   validateOTP_success,
//   validateOTP_error
// } = authSlice.actions;
