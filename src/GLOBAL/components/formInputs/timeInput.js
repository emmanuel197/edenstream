import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import "../../styles/formInputStyles/time-input.scss";
import { handleTimeChange, handleHourChange, handleMinuteChange, handleAmPmChange, formatWithLeadingZeros } from '../../../utils/formInputHandlers';
const TimeInput = ({
  label,
  name,
  value,
  onChange,
  startShift,
  endShift,
  error,
  className,
}) => {
  const [hour, setHour] = useState(value ? new Date(value).getHours() % 12 || 12 : 12);
  const [minute, setMinute] = useState(value ? new Date(value).getMinutes() : 0);
  const [ampm, setAmPm] = useState(value && new Date(value).getHours() >= 12 ? 'PM' : 'AM');

  const handleHourChangeWrapper = (e) => {
    handleHourChange(e, setHour, () => handleTimeChange(hour, minute, ampm, onChange, name));
  };

  const handleMinuteChangeWrapper = (e) => {
    handleMinuteChange(e, setMinute, () => handleTimeChange(hour, minute, ampm, onChange, name));
  };

  const handleAmPmChangeWrapper = (newAmPm) => {
    setAmPm(newAmPm);
    handleTimeChange(hour, minute, newAmPm, onChange, name);
  };

  return (
    <div className={`time-entry-container ${className}`}>
      <div className="time-entry">
        <label>{label}</label>
        <div className="custom-time-picker">
          <input
            type="number"
            value={formatWithLeadingZeros(hour)}
            onChange={handleHourChangeWrapper}
            min="1"
            max="12"
            className="time-input"
          />
          :
          <input
            type="number"
            value={formatWithLeadingZeros(minute)}
            onChange={handleMinuteChangeWrapper}
            min="0"
            max="59"
            className="time-input"
          />

          <div className="ampm-toggle">
            <button
              type="button"
              className={ampm === 'AM' ? 'active' : ''}
              onClick={() => handleAmPmChangeWrapper('AM')}
            >
              AM
            </button>
            <button
              type="button"
              className={ampm === 'PM' ? 'active' : ''}
              onClick={() => handleAmPmChangeWrapper('PM')}
            >
              PM
            </button>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

TimeInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  startShift: PropTypes.instanceOf(Date),
  endShift: PropTypes.instanceOf(Date),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]), // Updated
  className: PropTypes.string,
};

export default TimeInput;


