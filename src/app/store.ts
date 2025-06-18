import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/authSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../services/userApi";
import { currentUserApi } from "../services/currentUserApi";

//persistence
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { jengaApi } from "../services/jengaApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    userState: persistedReducer,
    [userApi.reducerPath]: userApi.reducer,
    [currentUserApi.reducerPath]: currentUserApi.reducer,
    [jengaApi.reducerPath]: jengaApi.reducer,
  },

  middleware: (getDefaultMiddelware) =>
    getDefaultMiddelware({
      serializableCheck: false,
    }).concat(
      userApi.middleware,
      currentUserApi.middleware,
      jengaApi.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
