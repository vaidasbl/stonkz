import * as React from "react";
import Paginate from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Pagination = ({ numOfPages, setPage }) => {
  return (
    <Stack spacing={2}>
      <Paginate count={numOfPages} onChange={(e, value) => setPage(value)} />
    </Stack>
  );
};

export default Pagination;
