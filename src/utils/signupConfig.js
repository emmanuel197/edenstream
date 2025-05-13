// signupConfig.js
import { verifyUserData, verifyOTP, verifyResetOTP } from '../GLOBAL/redux/auth';
import { store } from '../GLOBAL/redux/store';
import { setStep, updateFormData} from '../GLOBAL/redux/slice/formSlice';
import {  isLoadingReducer  } from "../GLOBAL/redux/slice/authSlice"
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
        const response = await verifyUserData(
          true,
          mobileNumber,
          '', // email unused
          dob,
          password,
          rePassword
        );
        store.dispatch(isLoadingReducer(false))
        return response;
      } catch (error) {
        console.error('Step1 submission error:', error);
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
        const { password } = state.form.formData[1];
       
        if (password) {
          // Regular signup flow
          const result = await verifyOTP(
            true,
            otp,
            password
          );
          console.log(result)
          if (result) {
            // Clear sensitive data
           
            return true;
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