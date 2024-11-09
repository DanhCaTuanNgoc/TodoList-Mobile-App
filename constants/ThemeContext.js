import React, { createContext, useContext, useState, useEffect } from 'react'
import { themes } from './index'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
   const [theme, setTheme] = useState(themes.light) // Default to light theme

   useEffect(() => {
      const loadTheme = async () => {
         const savedTheme = await AsyncStorage.getItem('appTheme')
         if (savedTheme === 'light') {
            setTheme(themes.light)
         } else if (savedTheme === 'dark') {
            setTheme(themes.dark)
         } else {
            await AsyncStorage.setItem('appTheme', 'light')
         }
      }
      loadTheme()
   }, [])

   const toggleTheme = async () => {
      setTheme((prevTheme) => {
         const newTheme = prevTheme === themes.light ? themes.dark : themes.light
         AsyncStorage.setItem('appTheme', newTheme === themes.light ? 'light' : 'dark') // Save new theme
         return newTheme
      })
   }

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   )
}

export const useTheme = () => useContext(ThemeContext)
