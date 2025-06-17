import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import recommendedBooksReducer from "./recommendedBooks/recommendedBooksSlice.js";
import ownBooksReducer from "./ownBooks/ownBooksSlice.js";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";

const persistedAuthReducer = persistReducer(
  {
    key: "jwt-token",
    storage,
    whitelist: ["token", "refreshToken"],
  },
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    recommendedBooks: recommendedBooksReducer,
    ownBooks: ownBooksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
