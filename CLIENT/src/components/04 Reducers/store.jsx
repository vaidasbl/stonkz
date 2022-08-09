import { configureStore } from "@reduxjs/toolkit";
import graphDataReducer from "./graphData";
import companyDataReducer from "./companyData";

const store = configureStore({
  reducer: { graphData: graphDataReducer, companyData: companyDataReducer },
});

export default store;
