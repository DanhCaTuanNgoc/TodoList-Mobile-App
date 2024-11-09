import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   uid: null,
   name: null,
   uuid: null,
   error: null,
}

const userSlice = createSlice({
   name: 'user_id',
   initialState,
   reducers: {
      setUID: (state, action) => {
         state.uid = action.payload
      },
      setName: (state, aciton) => {
         state.name = aciton.payload
      },
      setUUID: (state, action) => {
         state.uuid = action.payload
      },
      mergeUID: (state, action) => {
         state.uid = action.payload
      },
      clearUid: (state, action) => {
         state.uid = null
      },
      clearUserName: (state, action) => {
         state.name = null
      },
   },
})

export default userSlice.reducer

export const { setUID, setName, mergeUID, setUUID, clearUid, clearUserName } =
   userSlice.actions
