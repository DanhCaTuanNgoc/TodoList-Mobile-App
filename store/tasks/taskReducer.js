// src/redux/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   tasks: [],
   loading: false,
   error: null,
}

const taskSlice = createSlice({
   name: 'tasssks',
   initialState,
   reducers: {
      setLoading: (state) => {
         state.loading = true
      },
      setError: (state, action) => {
         state.loading = false
         state.error = action.payload
      },
      addTaskSuccess: (state, action) => {
         console.log('addTaskSuccess payload:', action.payload)
         state.loading = false
         state.tasks.push(action.payload)
      },
      fetchTasksSuccess: (state, action) => {
         state.loading = false
         state.tasks = action.payload
      },
      deleteTask: (state, action) => {
         state.loading = false
         state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      },
      updateTask: (state, action) => {
         state.loading = false
         const index = state.tasks.findIndex((task) => task.id === action.payload.id)
         if (index !== -1) {
            state.tasks[index] = { ...state.tasks[index], ...action.payload }
         }
      },
      clearTasks: (state) => {
         state.tasks = []
      },
   },
})

export const {
   setLoading,
   setError,
   addTaskSuccess,
   fetchTasuccess,
   fetchTasksSuccess,
   deleteTask,
   updateTask,
   clearTasks,
} = taskSlice.actions
export default taskSlice.reducer
