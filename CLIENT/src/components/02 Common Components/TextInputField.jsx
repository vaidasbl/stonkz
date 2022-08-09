import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setGraphData } from "../04 Reducers/graphData";

export default function TextInputField({ label, value }) {
  const dispatch = useDispatch();
  const graphData = useSelector((state) => state.graphData.value);

  const handleChange = (e) => {
    dispatch(setGraphData({ ...graphData, symbol: e.target.value }));
  };
  return (
    <Box component="form">
      <TextField
        label={label}
        variant="outlined"
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
