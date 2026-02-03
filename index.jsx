import Calendar from "./src/comp/calendar";

// Re-export the core Calendar component so consumers can pass props
// like selectedDates, colors, etc.
const FillCalendar = (props) => {
  return <Calendar {...props} />;
};

export default FillCalendar;
export { Calendar };
