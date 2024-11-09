import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '../constants/ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { setUID, setName } from '@/store/user/userReducer'

const Welcome = ({ navigation }) => {
   const dispatch = useDispatch()
   const { theme, toggleTheme } = useTheme() // Use theme and toggleTheme

   useEffect(() => {
      const getUser = async () => {
         const uid = await AsyncStorage.getItem('userId')
         const userName = await AsyncStorage.getItem('userName')
         const guest = await AsyncStorage.getItem('guestActive')
         if (uid) {
            await dispatch(setUID(parseInt(uid)))
            await dispatch(setName(userName))
            navigation.navigate('MainTab')
         } else if (guest) {
            navigation.navigate('MainTab')
         }
      }
      getUser()
   }, [])

   const handleGuest = async () => {
      await AsyncStorage.setItem('guestActive', 'true')
      navigation.navigate('MainTab')
   }

   const backgroundColor = '#ffffff'
   const textColor = '#000000'
   const buttonColor = '#FF5252'

   return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
         <Text style={[styles.title, { color: textColor }]}>Welcome to TodoList</Text>
         <Text style={[styles.subtitle, { color: textColor }]}>
            Let's manage your task
         </Text>

         <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[styles.btn, { backgroundColor: buttonColor }]}
         >
            <Text style={styles.btnText}>Login</Text>
         </TouchableOpacity>

         <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={[styles.btn, { backgroundColor: buttonColor }]}
         >
            <Text style={styles.btnText}>Register</Text>
         </TouchableOpacity>

         <TouchableOpacity
            onPress={handleGuest}
            style={[styles.btn, { backgroundColor: buttonColor }]}
         >
            <Text style={styles.btnText}>As a guest</Text>
         </TouchableOpacity>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
   },
   subtitle: {
      fontSize: 16,
   },
   btn: {
      width: '80%',
      paddingVertical: 12,
      borderRadius: 8,
      marginVertical: 10,
      alignItems: 'center',
   },
   btnText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
   },
})

export default Welcome
