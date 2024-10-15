import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
   const [userId, setUserId] = useState(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      // Kiểm tra xem user đã đăng nhập chưa khi ứng dụng khởi động
      const loadUserData = async () => {
         try {
            const storedUserId = await AsyncStorage.getItem('user_id')
            if (storedUserId) {
               setUserId(storedUserId)
            }
         } catch (e) {
            console.error(e)
         } finally {
            setLoading(false)
         }
      }

      loadUserData()
   }, [])

   const login = async (id) => {
      try {
         await AsyncStorage.setItem('user_id', id.toString())
         setUserId(id)
      } catch (e) {
         console.error(e)
      }
   }

   const logout = async () => {
      try {
         await AsyncStorage.removeItem('user_id')
         setUserId(null)
      } catch (e) {
         console.error(e)
      }
   }

   return (
      <AuthContext.Provider value={{ userId, login, logout, loading }}>
         {children}
      </AuthContext.Provider>
   )
}
