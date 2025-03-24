import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
// import { apiSlice } from "../redux/user/apiSlice";

export const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
