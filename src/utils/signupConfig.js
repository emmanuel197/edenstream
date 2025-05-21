// signupConfig.js
import { verifyUserData, verifyOTP, verifyResetOTP } from '../GLOBAL/redux/auth';
import { store } from '../GLOBAL/redux/store';
import { setStep, updateFormData} from '../GLOBAL/redux/slice/formSlice';
import {  isLoadingReducer  } from "../GLOBAL/redux/slice/authSlice"
import { format } from 'date-fns';

export const signupSteps = {
  1: {
    initial: {
      mobileNumber: '',
      password: '',
      rePassword: '',
      dob: null,
    },
    transform: {
      mobileNumber: (raw) => {
        const digitsOnly = raw.replace(/\D/g, '');
        return digitsOnly.slice(0, 10);
      },
    },
    validate: () => null,
    submit: async ({ mobileNumber, dob, password, rePassword }, dispatch) => {
      try {
        store.dispatch(isLoadingReducer(true))
        // Ensure dob is formatted as YYYY-MM-DD
        let dobString = dob;
        if (dob) {
          const dateObj = typeof dob === 'string' ? new Date(dob) : dob;
          dobString = format(dateObj, 'yyyy-MM-dd');
        }
        console.log('[signupConfig][Step1] Submitting:', { mobileNumber, dob: dobString, password, rePassword });
        const signupResponse = await verifyUserData(
          true,
          mobileNumber,
          '', // email unused
          dobString,
          password,
          rePassword
        );
        console.log('[signupConfig][Step1] Signup response:', signupResponse);
        // After signup, go to OTP step (step 2), do not log in yet
        store.dispatch(isLoadingReducer(false));
        return signupResponse ? true : false;
      } catch (error) {
        console.error('Step1 submission error:', error);
        store.dispatch(isLoadingReducer(false));
        return false;
      }
    }
  },
  2: {
    initial: { otp: '' },
    validate: (data) => null,
    submit: async ({ otp }, dispatch) => {
      try {
        const state = store.getState();
        const { password, mobileNumber } = state.form.formData[1];
        console.log('[signupConfig][Step2] Submitting OTP:', otp, 'with password:', password);
        if (password) {
          // Regular signup flow
          const result = await verifyOTP(
            true,
            otp,
            password
          );
          console.log('[signupConfig][Step2] OTP verification result:', result);
          if (result) {
            // After OTP verification, log in before proceeding to step 3
            console.log('[signupConfig][Step2] Attempting login with:', { mobileNumber, password });
            const loginResponse = await import('../GLOBAL/redux/auth').then(mod => mod.LoginUnicast(true, mobileNumber, '', password));
            console.log('[signupConfig][Step2] Login response:', loginResponse);

            // Re-read user info from cookies/localStorage
            const { COOKIES } = await import("../utils/constants");
            const user_info = COOKIES.get("user_info");
            console.log('[signupConfig][Step2] user_info after login:', user_info);

            // Now fetch genres with the new token
            if (user_info && user_info.data && user_info.data.data && user_info.data.data.access_token) {
              const { fetchGenres } = await import("../GLOBAL/redux/fetchMoviesApi");
              fetchGenres(dispatch);
            }

            return !!loginResponse;
          }
          return false;
        }
        
        // // Password reset flow
        // const result = await verifyResetOTP({
        //   mobileNumber,
        //   otp,
        //   navigate: () => store.dispatch(setStep(3)) // Example next step
        // });
        
        // return result.payload?.success || false;
      } catch (error) {
        console.error('OTP verification failed:', error);
        return false;
      }
    }
  }
};