import DateRangePicker from "./datePicker";


const SingleDatePicker = (props) => (
    <DateRangePicker 
      {...props}
      isRangePicker={false}
    />
  );
export default SingleDatePicker