import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    name: "",
    country: "",
    currency: "",
    weburl: "",
    ticker: "",
  },
};

export const companyDataSlice = createSlice({
  name: "companyData",
  initialState,

  reducers: {
    setCompanyData(state, req) {
      state.value = {
        name: req.payload.name,
        country: req.payload.country,
        currency: req.payload.currency,
        weburl: req.payload.weburl,
        ticker: req.payload.ticker,
      };
    },
  },
});

export const { setCompanyData } = companyDataSlice.actions;
export default companyDataSlice.reducer;
