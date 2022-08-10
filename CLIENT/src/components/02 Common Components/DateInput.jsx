import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateInput({ label, value, setDate }) {
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
        className="aaa"
        label={label}
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField variant="outlined" {...params} />}
      />
    </LocalizationProvider>
  );
}
