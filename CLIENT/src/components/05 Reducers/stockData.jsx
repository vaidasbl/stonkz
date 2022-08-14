import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    stocks: {},
  },
};

export const stockDataSlice = createSlice({
  name: "stockData",
  initialState,

  reducers: {
    setStockData(state, req) {
      state.value = {
        stocks: req.payload.stocks,
      };
    },
  },
});

export const { setStockData } = stockDataSlice.actions;
export default stockDataSlice.reducer;
