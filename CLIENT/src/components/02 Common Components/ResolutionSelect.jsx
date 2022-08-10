import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ResolutionSelect({ value, setResolution }) {
  const handleChange = (e) => {
    setResolution(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel>Resolution</InputLabel>
        <Select value={value} label="Resolution" onChange={handleChange}>
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
