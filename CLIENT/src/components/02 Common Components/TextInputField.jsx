import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { validate } from "../05 Functions/ValidatorLettersAndSpace";

export default function TextInputField({
  label,
  value,
  setData,
  handleSubmit,
}) {
  const [valid, setValid] = useState(true);
  const handleChange = (e) => {
    validate(e, setData, setValid);
  };
  return (
    <Box component="">
      <TextField
        error={!valid}
        label={valid ? label : "Only letters!"}
        variant="outlined"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        inputProps={{ maxLength: 35, style: { textTransform: "uppercase" } }}
      />
    </Box>
  );
}
