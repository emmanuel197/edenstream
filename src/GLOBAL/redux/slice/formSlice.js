// src/redux/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,
  formData: {
    // Store data by step number
    1: {}, // Step 1 data (mobile, dob, password)
    2: {}, // Step 2 data (OTP)
    // ... add more steps as needed
  },
 

  inputStarted: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    updateFormData: (state, action) => {
      const { step, data } = action.payload;
      state.formData[step] = {
        ...state.formData[step],
        ...data
      };
    },
    clearFormData: (state) => {
      state.formData = initialState.formData;
    },
    setInputStarted: (state, action) => {
      state.inputStarted = action.payload;
    },
      
    setStep: (state, action) => {
      state.step = action.payload;
    }
  },
});

export const { nextStep, prevStep, updateFormData, 
  clearFormData, setInputStarted, setStep } = formSlice.actions;

export default formSlice.reducer;
