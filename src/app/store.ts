import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/authSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../services/userApi";
import { currentUserApi } from "../services/currentUserApi";
import { jengaApi } from "../services/jengaApi";

//persistence
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { getJengaTokenApi } from "../services/getJengaTokenApi";
import { tenantApi } from "@/services/tenantsApi";
import { propertiesApi } from "@/services/propertiesApi";

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
    user: persistedReducer,
    [userApi.reducerPath]: userApi.reducer,
    [currentUserApi.reducerPath]: currentUserApi.reducer,
    [jengaApi.reducerPath]: jengaApi.reducer,
    [getJengaTokenApi.reducerPath]: getJengaTokenApi.reducer,
    [tenantApi.reducerPath]: tenantApi.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      userApi.middleware,
      currentUserApi.middleware,
      jengaApi.middleware,
      getJengaTokenApi.middleware,
      tenantApi.middleware,
      propertiesApi.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

//types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
