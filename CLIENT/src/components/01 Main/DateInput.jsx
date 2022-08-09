import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { setGraphData } from "../04 Reducers/graphData";

export default function DateInput({
  label,
  setDate,
  date,
  needDispatch,
  from,
}) {
  const dispatch = useDispatch();
  const graphData = useSelector((state) => state.graphData.value);
  const handleChange = (newValue) => {
    if (needDispatch) {
      dispatch(
        setGraphData(
          from === "true"
            ? {
                ...graphData,
                dateFrom: new Date(newValue).toLocaleDateString("en-US"),
              }
            : {
                ...graphData,
                dateTill: new Date(newValue).toLocaleDateString("en-US"),
              }
        )
      );
    } else {
      setDate(newValue);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={date}
        onChange={(newValue) => handleChange(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
