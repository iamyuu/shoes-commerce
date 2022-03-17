import { combineReducers } from '@reduxjs/toolkit'
import { bagReducer } from './bag/slice'
import { shoesApi } from 'services/shoes'

export default combineReducers({
  [shoesApi.reducerPath]: shoesApi.reducer,
  bag: bagReducer
})
