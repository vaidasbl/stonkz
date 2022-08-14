import { configureStore } from "@reduxjs/toolkit";
import graphDataReducer from "./graphData";
import companyDataReducer from "./companyData";
import stockDataReducer from "./stockData";

const store = configureStore({
  reducer: {
    graphData: graphDataReducer,
    companyData: companyDataReducer,
    stockData: stockDataReducer,
  },
});

export default store;
