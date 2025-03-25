import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
// import { apiSlice } from "../redux/user/apiSlice";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // [apiSlice.reducerPath]: apiSlice.reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
