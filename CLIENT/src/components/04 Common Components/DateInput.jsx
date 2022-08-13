import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateInput = ({ label, value, setDate }) => {
  const handleChange = (newValue) => {
    if (newValue !== null) {
      setDate(newValue.toLocaleDateString("en-US"));
    } else {
      setDate(null);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField size="normal" variant="outlined" {...params} />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
