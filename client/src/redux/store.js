import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import thunkMiddleware from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(thunkMiddleware),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;
