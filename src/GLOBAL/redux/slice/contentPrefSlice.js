// src/redux/contentPrefSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contentPrefStep: 1,
  formData: {},
  inputStarted: false,
};

const contentPrefSlice = createSlice({
  name: 'contentPref',
  initialState,
  reducers: {
    nextContentPrefStep: (state) => {
      state.contentPrefStep += 1;
    },
    prevContentPrefStep: (state) => {
      state.contentPrefStep -= 1;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setInputStarted: (state, action) => {
        state.inputStarted = action.payload;
      },
      
    setContentPrefStep: (state, action) => {
      state.step = action.payload;
    }
  },
});

export const { nextContentPrefStep, prevContentPrefStep, setFormData, setInputStarted, setContentPrefStep } = contentPrefSlice.actions;

export default contentPrefSlice.reducer;
