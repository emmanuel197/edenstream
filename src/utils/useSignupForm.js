import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupSteps } from './signupConfig';
import { useNavigate } from 'react-router-dom';
import { updateFormData } from '../GLOBAL/redux/slice/formSlice'; // Import the Redux action

export const useSignupForm = (stepNumber) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((s) => s.auth);
  const { formData } = useSelector((state) => state.form);
  const config = signupSteps[stepNumber];

  // Initialize local data from Redux store or config
  const [localData, setLocalData] = useState(
    formData[stepNumber] || config.initial
  );

  // Sync with Redux when step changes
  useEffect(() => {
    const storedData = formData[stepNumber] || config.initial;
    setLocalData(storedData);
  }, [stepNumber, formData, config.initial]);

  const handleInputChange = (field, rawValue) => {
    const transformer = config.transform?.[field];
    let value = transformer ? transformer(rawValue) : rawValue;
    // Ensure dob is always a string
    if (field === 'dob' && value instanceof Date) {
      value = value.toISOString();
    }
    // Update local state
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    
    // Update Redux store
    dispatch(updateFormData({
      step: stepNumber,
      data: newData
    }));
  };

  const validateForm = () => config.validate(localData);

  const handleSubmit = async (nextStep) => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    try {
      const success = await config.submit(localData, dispatch, navigate);
      if (success) {
        nextStep();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred during submission');
    }
  };

  return {
    formData: localData,
    handleInputChange,
    validateForm,
    handleSubmit,
    isLoading,
  };
};