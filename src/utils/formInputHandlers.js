//time-input-handles

// Utility function to format numbers with leading zeros
export const formatWithLeadingZeros = (num) => num.toString().padStart(2, '0');

// Utility function to handle time changes
export const handleTimeChange = (hour, minute, ampm, onChange, name) => {
  const hours = ampm === 'PM' && hour < 12 ? hour + 12 : ampm === 'AM' && hour === 12 ? 0 : hour;
  const newValue = new Date();
  newValue.setHours(hours, minute, 0, 0);
  onChange({ target: { name, value: newValue } });
};

// Utility function to handle hour changes
export const handleHourChange = (e, setHour, handleTimeChange) => {
  const newHour = Math.min(Math.max(parseInt(e.target.value, 10), 1), 12);
  setHour(newHour);
  handleTimeChange();
};

// Utility function to handle minute changes
export const handleMinuteChange = (e, setMinute, handleTimeChange) => {
  const newMinute = Math.min(Math.max(parseInt(e.target.value, 10), 0), 59);
  setMinute(newMinute);
  handleTimeChange();
};


// Utility function to validate shift times
export const validateShiftTimes = (name, newValues, prevValues) => {
  const startShift = newValues.startShift ? new Date(newValues.startShift) : null;
  const endShift = newValues.endShift ? new Date(newValues.endShift) : null;
  const breakTime = newValues.breakTime ? new Date(newValues.breakTime) : null;

  if (name === "endShift" && startShift && endShift && endShift <= startShift) {
    alert("End Shift cannot be before Start Shift");
    return prevValues; // Return previous values if validation fails
  }

  if (name === "breakTime" && startShift && endShift && breakTime) {
    if (breakTime <= startShift || breakTime >= endShift) {
      alert("Break time must be between Start Shift and End Shift");
      return prevValues; // Return previous values if validation fails
    }
  }

  return newValues; // Return updated values if validation passes
};