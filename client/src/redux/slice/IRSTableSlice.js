import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  IRSProviders: [],
  foundMatches: 0
}

export const IRStableSlice = createSlice({
  name: 'IRSTable',
  initialState,
  reducers: {
    setIRSProviders: (state, action) => {
      state.IRSProviders = action.payload
    },
    setFoundMatches: (state, action) => {
      state.foundMatches = action.payload
    },
    sortBy: (state, action) => {}
  }
})

export const { setIRSProviders, setFoundMatches } = IRStableSlice.actions

export default IRStableSlice.reducer
