import musicReducer from "./musicSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: musicReducer,
});
