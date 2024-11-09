import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './tasks/taskReducer'
import userReducer from './user/userReducer'
import eventReducer from './event/eventReducer'

const store = configureStore({
   reducer: {
      taskState: taskReducer,
      userState: userReducer,
      eventState: eventReducer,
   },
})

export default store
