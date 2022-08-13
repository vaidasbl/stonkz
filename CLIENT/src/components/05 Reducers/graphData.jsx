import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    symbol: "",
    dateFrom: null,
    dateTill: null,
    resolution: "D",
  },
};

export const graphDataSlice = createSlice({
  name: "graphData",
  initialState,

  reducers: {
    setGraphData(state, req) {
      state.value = {
        symbol: req.payload.symbol,
        dateFrom: req.payload.dateFrom,
        dateTill: req.payload.dateTill,
        resolution: req.payload.resolution,
      };
    },
  },
});

export const { setGraphData } = graphDataSlice.actions;
export default graphDataSlice.reducer;
