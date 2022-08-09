import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setGraphData } from "../04 Reducers/graphData";

export default function ResolutionSelect() {
  const dispatch = useDispatch();
  const graphData = useSelector((state) => state.graphData.value);

  const handleChange = (e) => {
    dispatch(setGraphData({ ...graphData, resolution: e.target.value }));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Resolution</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={graphData.resolution}
          label="Resolution"
          onChange={handleChange}
        >
          <MenuItem value={"1"}>1</MenuItem>
          <MenuItem value={"5"}>5</MenuItem>
          <MenuItem value={"15"}>15</MenuItem>
          <MenuItem value={"30"}>30</MenuItem>
          <MenuItem value={"60"}>60</MenuItem>
          <MenuItem value={"D"}>D</MenuItem>
          <MenuItem value={"W"}>W</MenuItem>
          <MenuItem value={"M"}>M</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
