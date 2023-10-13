import { configureStore } from '@reduxjs/toolkit'
import IRStableReducer from './slice/IRSTableSlice'

const store = configureStore({
  reducer: {
    IRStable: IRStableReducer
  }
})

export default store
