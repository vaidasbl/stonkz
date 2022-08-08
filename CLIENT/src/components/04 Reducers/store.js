import { configureStore } from "@reduxjs/toolkit";
import historyDateReducer from "./historyDate";

const store = configureStore({
  reducer: { historyDate: historyDateReducer },
});

export default store;
