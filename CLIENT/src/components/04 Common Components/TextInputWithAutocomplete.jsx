import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import symbols from "../06 Functions/symbols";

const TextInputWithAutocomplete = () => {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={symbols.map((option) => option.symbol)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
    </Stack>
  );
};

export default TextInputWithAutocomplete;
