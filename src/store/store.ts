import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import reducer from './reducer'

const persistConfig = {
  key: 'shoes-commerce',
  storage,
  whitelist: ['bag']
}

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
