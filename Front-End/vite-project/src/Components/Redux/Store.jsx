
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import storage from 'redux-persist/lib/storage'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import { eventReducers } from "./State";

const persistConfig = {
    key: 'root',
    storage: storage,
  }

const persistedReducer = persistReducer(persistConfig, eventReducers);


 const store = configureStore({
    reducer: {eventReducers: persistedReducer},
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),

})
setupListeners(store.dispatch)

export default store
