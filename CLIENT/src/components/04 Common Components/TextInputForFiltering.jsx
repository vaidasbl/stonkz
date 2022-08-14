import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const TextInputForFiltering = ({ label, setFilterString, filterString }) => {
  const [valid, setValid] = useState(true);

  const handleSearch = async (e) => {
    const filterString = e.target.value;
    const regex = /^[a-zA-Zą-ž\s\d-:,.]+$/;

    try {
      if (filterString === "" || regex.test(filterString)) {
        setFilterString(filterString);
      } else {
        setValid(false);
        setTimeout(() => setValid(true), 500);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box component="">
      <TextField
        error={!valid}
        label={valid ? label : "No special characters!"}
        variant="outlined"
        value={filterString}
        onChange={handleSearch}
        inputProps={{ maxLength: 35, style: { textTransform: "uppercase" } }}
        size="small"
      />
    </Box>
  );
};

export default TextInputForFiltering;
