import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  displayNumbers: { start: 0, end: 0 },
  currentLocation: { state: '', zipCode: '' },
  IRSProviders: [],
  currentPage: 0,
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
    setDisplayNumbers: (state, action) => {
      state.displayNumbers = action.payload
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
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

export const { setIRSProviders, setFoundMatches, setDisplayNumbers, setCurrentLocation, setCurrentPage, sortBy } =
  IRStableSlice.actions

export default IRStableSlice.reducer
