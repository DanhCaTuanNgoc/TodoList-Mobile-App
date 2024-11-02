// src/redux/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   tasks: [],
   completed: [],
   incompleted: [],
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
         state.loading = false
         state.tasks.push(action.payload)
         state.completed = state.tasks.filter((index) => index.completed == true)
         state.incompleted = state.tasks.filter((index) => index.completed == false)
      },
      fetchTasksSuccess: (state, action) => {
         state.loading = false
         state.tasks = action.payload
         state.completed = action.payload.filter((index) => index.completed == true)
         state.incompleted = action.payload.filter((index) => index.completed == false)
      },
      deleteTaskSuccess: (state, action) => {
         state.loading = false
         state.tasks = state.tasks.filter((task) => task.id !== parseInt(action.payload))
         state.completed = state.tasks.filter((task) => task.completed == true)
         state.incompleted = state.tasks.filter((index) => index.completed == false)
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
         state.completed = []
         state.incompleted = []
      },
   },
})

export const {
   setLoading,
   setError,
   addTaskSuccess,
   fetchTasuccess,
   fetchTasksSuccess,
   deleteTaskSuccess,
   updateTask,
   clearTasks,
} = taskSlice.actions
export default taskSlice.reducer
