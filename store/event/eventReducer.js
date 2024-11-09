import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   events: [],
}

const eventSlice = createSlice({
   name: 'events',
   initialState,
   reducers: {
      fetchEventsSuccess: (state, action) => {
         state.events = action.payload
      },
      addEventsSuccess: (state, action) => {
         state.events.push(action.payload)
      },
      deleteEventsSuccess: (state, action) => {
         state.events = state.events.filter((index) => index.id !== action.payload.id)
      },
      clearEvents: (state) => {
         state.events = []
      },
   },
})

export default eventSlice.reducer

export const { fetchEventsSuccess, addEventsSuccess, deleteEventsSuccess, clearEvents } =
   eventSlice.actions
