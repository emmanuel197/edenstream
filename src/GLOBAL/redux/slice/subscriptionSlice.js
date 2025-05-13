import { createSlice } from "@reduxjs/toolkit";
const fetchPackageSlice = createSlice({
  name: "fetchPackages",
  initialState: {
    isLoading: false,
    modalOpen: false,
    productId: null,
    productName: null,
    productPrice: null,
    paymentInitiated: false,
    purchaseHistory: null,
    isChecked: false,
    activeSubscription: false,
    premiumSub: JSON.parse(window.localStorage.getItem('premiumSub')) || false // Initialize from localStorage
  },
  reducers: {
    fetchPackageReducer: (state, action) => {
      state.isLoading = action.payload;
    },
    subscriptionModalReducer: (state, action) => {
        if (action.payload.hasOwnProperty('isOpen')) {
            // Check if isOpen property exists in payload
            state.modalOpen = action.payload.isOpen;
          }
          if (action.payload.hasOwnProperty('productId')) {
            // Check if subscriptionId property exists in payload
            state.productId = action.payload.productId;
          }
          if (action.payload.hasOwnProperty('productName')) {
            // Check if subscriptionId property exists in payload
            state.productName = action.payload.productName;
          }
          if (action.payload.hasOwnProperty('productPrice')) {
            // Check if subscriptionId property exists in payload
            state.productPrice = action.payload.productPrice;
          }
          if (action.payload.hasOwnProperty('currency')) {
            // Check if subscriptionId property exists in payload
            state.currency = action.payload.currency;
          }
    },
    paymentInitiatedReducer: (state, action) => {
        if (action.payload === 'initiated') {
            state.paymentInitiated = true;
        }
    },
    purchaseHistoryReducer: (state, action) => {
      state.purchaseHistory = action.payload
    },
    handleToggleMenuReducer: (state, action) => {
      state.isChecked = action.payload
      
    },
    activeSubscriptionReducer: (state, action) => {
      state.activeSubscription = action.payload
     
    },
    premiumSubReducer: (state, action) => {
      state.premiumSub = action.payload
      window.localStorage.setItem('premiumSub', JSON.stringify(action.payload));
    }

  }
});

export default fetchPackageSlice.reducer;
export const { fetchPackageReducer, subscriptionModalReducer, paymentInitiatedReducer, purchaseHistoryReducer, handleToggleMenuReducer, activeSubscriptionReducer, premiumSubReducer } =
  fetchPackageSlice.actions;
