import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tableData: []
}

export const IRStableSlice = createSlice({
  name: 'IRSTable',
  initialState,
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload
    }
  }
})

export const { setTableData } = IRStableSlice.actions

export default IRStableSlice.reducer
