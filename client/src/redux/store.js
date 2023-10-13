import { configureStore } from '@reduxjs/toolkit'
import IRSTableReducer from './slice/IRSTableSlice'

const store = configureStore({
  reducer: {
    IRSTable: IRSTableReducer
  }
})

export default store
