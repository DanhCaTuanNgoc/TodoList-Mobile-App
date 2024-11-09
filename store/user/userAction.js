import AsyncStorage from '@react-native-async-storage/async-storage'
import { setName, setUID } from './userReducer'
import API_BASE_URL from '../IPv4'
import { addTask } from '../tasks/taskAction'
import { Alert } from 'react-native'

export const userLogin = (email, password) => async (dispatch) => {
   try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
         throw new Error('Network was not ok')
      }

      await AsyncStorage.setItem('userId', data.id.toString())
      await AsyncStorage.setItem('userName', data.user_name)
      await dispatch(setUID(data.id))
      await dispatch(setName(data.user_name))
   } catch (error) {
      console.log('ERROR :', error.message)
      throw error
   }
}

export const userRegister = (user_name, email, password) => async (dispatch) => {
   try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ user_name, email, password }),
      })
      if (!response.ok) {
         throw new Error('Network was not ok')
      }
      const data = await response.json()
      if (data && data.id) {
         const guestTask = await AsyncStorage.getItem('guestTask')
         if (guestTask) {
            const tasks = JSON.parse(guestTask)
            if (tasks.length > 0) {
               await Promise.all(
                  tasks.map(async (task) => {
                     const result = await dispatch(addTask(data.id, task.title))
                  }),
               )
               await AsyncStorage.removeItem('guestTask')
               await AsyncStorage.removeItem('guestActive')
            }
         }
      } else {
         console.log('Error', 'Registration failed, please try again.')
      }
      return data
   } catch (error) {
      console.log('ERROR register : ', error.message)
   }
}
