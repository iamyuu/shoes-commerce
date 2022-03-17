import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { shoesApi } from 'services/shoes'
import storage from 'redux-persist/lib/storage'
import reducer from './reducer'

const persistConfig = {
  key: 'shoes-commerce',
  storage,
  whitelist: ['bag']
}

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }).concat(shoesApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
