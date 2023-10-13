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
    sortBy: (state, action) => {
      const sortOption = action.payload

      if (state.IRSProviders.length > 0) {
        state.IRSProviders.sort((a, b) => {
          const valueA = a[sortOption].toLowerCase()
          const valueB = b[sortOption].toLowerCase()

          if (valueA < valueB) {
            return -1
          }
          if (valueA > valueB) {
            return 1
          }
          return 0
        })
      }
    }
  }
})

export const { setIRSProviders, setFoundMatches, sortBy } = IRStableSlice.actions

export default IRStableSlice.reducer
