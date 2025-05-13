import React, { useState, useEffect, useRef } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, setYear, setMonth } from 'date-fns';
import '../components/styles/date-range-picker.scss';
import { datePickerCaret } from '../../utils/assets';

const DateRangePicker = ({className, isRangePicker = false, onDateSelect}) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1));
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const months = Array.from({ length: 12 }, (_, i) => format(new Date(0, i), 'MMMM'));
  const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: 101 },      // 0…100 ⇒ 101 years total
  (_, i) => currentYear - i
);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDateDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMonthChange = (monthIndex) => {
    setCurrentDate(setMonth(currentDate, monthIndex));
    setShowDateDropdown(false);
  };

  const handleYearChange = (year) => {
    setCurrentDate(setYear(currentDate, year));
    setShowDateDropdown(false);
  };

  // ... keep existing functions (generateCalendar, isDateSelected, etc) ...
  const handleDateClick = (date) => {
    if (isRangePicker) {
      if (selectedDates.length === 2) setSelectedDates([date]);
      else setSelectedDates([...selectedDates, date].sort((a, b) => a - b));
    } else {
      setSelectedDate(date);
      onDateSelect(date); // Add this callback prop
    }
  };

 

  const generateCalendar = (date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Add previous month's days
    const startDay = monthStart.getDay();
    for (let i = 0; i < startDay; i++) {
      days.unshift(new Date(monthStart.getFullYear(), monthStart.getMonth(), -i));
    }

    // Add next month's days to fill 42 cells (6 weeks)
    while (days.length < 42) {
      days.push(new Date(days[days.length - 1].getTime() + 86400000));
    }

    return days;
  };
  const isDateSelected = (date) => {
    return isRangePicker 
      ? selectedDates.some(selectedDate => isSameDay(selectedDate, date))
      : isSameDay(date, selectedDate);
  };
  const isInRange = (date) => {
    if (selectedDates.length < 2) return false;
    return date > selectedDates[0] && date < selectedDates[1];
  };
  return (
    <div className={`date-range-picker ${className}`}>
      <div className="header">
        <div 
          className="current-date-wrapper"
          ref={dropdownRef}
          onClick={() => setShowDateDropdown(!showDateDropdown)}
        >
          <h2>{format(currentDate, 'MMMM yyyy')}</h2>
          <img loading="lazy" src={datePickerCaret} className="date-picker-caret"/>
          
          {showDateDropdown && (
            <div className="date-dropdown">
              <div className="dropdown-section">
                <div className="dropdown-grid">
                  {months.map((month, index) => (
                    <div
                      key={month}
                      className="dropdown-item"
                      onClick={() => handleMonthChange(index)}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="dropdown-section">
                <div className="dropdown-grid">
                  {years.map(year => (
                    <div
                      key={year}
                      className="dropdown-item"
                      onClick={() => handleYearChange(year)}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='date-header-controls'>
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>&lt;</button>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>&gt;</button>
        </div>
      </div>

      {/* ... rest of the existing JSX ... */}
      <div className="calendar-grid">
    {generateCalendar(currentDate).map((date, index) => (
      <div
        key={index}
        className={`day 
          ${!isSameMonth(date, currentDate) ? 'other-month' : ''}
          ${isDateSelected(date) ? 'selected' : ''}
          ${isRangePicker && isInRange(date) ? 'in-range' : ''}`}
        onClick={() => handleDateClick(date)}
      >
        {format(date, 'd')}
      </div>
    ))}
  </div>
    </div>
  );
};

export default DateRangePicker;