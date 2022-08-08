import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    dateFrom: null,
    dateTill: null,
  },
};

export const historyDateSlice = createSlice({
  name: "historyDate",
  initialState,

  reducers: {
    setHistoryDate(state, req) {
      state.value = {
        historyFrom: req.payload.historyFrom,
        historyTill: req.payload.historyTill,
      };
    },
  },
});

export const { setHistoryDate } = historyDateSlice.actions;
export default historyDateSlice.reducer;
