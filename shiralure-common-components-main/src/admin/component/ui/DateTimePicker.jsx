import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { MdOutlineCalendarMonth } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <div style={{ position: "relative", width: "100%" }}>
    <input
      type="text"
      className="form-control"
      placeholder=""
      value={value}
      onClick={onClick}
      onChange={onChange}
      ref={ref}
      style={{
        paddingRight: "2.5rem",
        width: "100%",
        boxSizing: "border-box",
        cursor: "pointer",
      }}
    />
    <MdOutlineCalendarMonth
      style={{
        position: "absolute",
        right: "0.75rem",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#6c757d",
        pointerEvents: "none",
        fontSize: "1.25rem",
      }}
    />
  </div>
));

const DateTimePicker = ({ value, onChange }) => {
  const handleManualInput = (e) => {
    const newValue = new Date(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="yyyy-MM-dd h:mm aa"
      popperPlacement="bottom-start"
      customInput={
        <CustomInput
          value={value ? value.toLocaleString() : ""}
          onChange={handleManualInput}
        />
      }
      wrapperClassName="w-100"
    />
  );
};

export default DateTimePicker;
