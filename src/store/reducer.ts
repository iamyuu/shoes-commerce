import { combineReducers } from '@reduxjs/toolkit'
import bagReducer from './bag/slice'

export default combineReducers({
  bag: bagReducer
})
