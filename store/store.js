import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './tasks/taskReducer'
import userReducer from './user/userReducer'

const store = configureStore({
   reducer: {
      taskState: taskReducer,
      userState: userReducer,
   },
})

export default store
