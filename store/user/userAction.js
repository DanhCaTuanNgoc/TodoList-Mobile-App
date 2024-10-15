import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUID, mergeUID } from './userReducer'
const API_BASE_URL = 'http://192.168.1.6:3000'

export const userLogin = (email, password) => async (dispatch) => {
   try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/jspn' },
         body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
         throw new Error('Network was not ok')
      }

      dispatch(setUID(data.id))
   } catch (error) {
      console.log('ERROR :', error.message)
      throw error
   }
}

export const userRegister = (user_name, email, password) => async (dispatch) => {
   try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
         method: 'POST',
         headers: { 'Content-Type ': 'application/json' },
         body: JSON.stringify({ user_name, email, password }),
      })
      if (!response.ok) {
         throw new Error('Network was not ok')
      }
      const data = await response.json()
   } catch (error) {
      console.log('ERROR : ', error.message)
   }
}
