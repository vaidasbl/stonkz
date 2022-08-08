import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { setHistoryDate } from "../04 Reducers/historyDate";

export default function DateInput({ label, payload }) {
  const dispatch = useDispatch();
  const historyDate = useSelector((state) => state.historyDate.value);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={
          payload === "historyFrom"
            ? historyDate.historyFrom || null
            : historyDate.historyTill || null
        }
        onChange={(newValue) => {
          dispatch(
            payload === "historyFrom"
              ? setHistoryDate({
                  ...historyDate,
                  historyFrom: newValue.toLocaleDateString("en-US"),
                })
              : setHistoryDate({
                  ...historyDate,
                  historyTill: newValue.toLocaleDateString("en-US"),
                })
          );
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
