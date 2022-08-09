import { configureStore } from "@reduxjs/toolkit";
import historyDataReducer from "./historyData";

const store = configureStore({
  reducer: { historyData: historyDataReducer },
});

export default store;
