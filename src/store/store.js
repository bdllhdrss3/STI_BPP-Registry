import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app/index'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export const store = configureStore({
  reducer: {
    app: persistedReducer
  },
})

export  const persistor = persistStore(store)