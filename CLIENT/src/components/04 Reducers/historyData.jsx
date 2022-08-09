import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    symbol: "",
    dateFrom: null,
    dateTill: null,
  },
};

export const historyDataSlice = createSlice({
  name: "historyData",
  initialState,

  reducers: {
    setHistoryData(state, req) {
      state.value = {
        symbol: req.payload.symbol,
        dateFrom: req.payload.dateFrom,
        dateTill: req.payload.dateTill,
      };
    },
  },
});

export const { setHistoryData } = historyDataSlice.actions;
export default historyDataSlice.reducer;
