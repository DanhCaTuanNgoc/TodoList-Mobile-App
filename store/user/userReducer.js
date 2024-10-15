import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   uid: null,
   error: null,
}

const userSlice = createSlice({
   name: 'user_id',
   initialState,
   reducers: {
      setUID: (state, action) => {
         state.uid = action.payload
      },
      mergeUID: (state, action) => {
         state.uid = action.payload
      },
   },
})

export default userSlice.reducer

export const { setUID, mergeUID } = userSlice.actions
