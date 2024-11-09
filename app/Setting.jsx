import {
   View,
   Text,
   Alert,
   StyleSheet,
   TouchableOpacity,
   SafeAreaView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { clearTasks } from '@/store/tasks/taskReducer'
import { clearUid, clearUserName } from '@/store/user/userReducer'
import { useTheme } from '../constants/ThemeContext'
import { clearEvents } from '@/store/event/eventReducer'

function User({ navigation }) {
   const dispatch = useDispatch()
   const { uuid, uid } = useSelector((state) => state.userState)
   const { theme, toggleTheme } = useTheme()

   const handleLogout = async () => {
      try {
         await AsyncStorage.multiRemove(['userId', 'userName'])
         dispatch(clearTasks())
         dispatch(clearUid())
         dispatch(clearUserName())
         dispatch(clearEvents())
         navigation.navigate('Welcome')
      } catch (err) {
         Alert.alert('Logout Failed', err.message)
      }
   }

   const handleLogin = () => navigation.navigate('Login')
   const handleRegister = () => navigation.navigate('Register')

   const {
      backgroundColor = '#ffffff',
      textColor = '#000000',
      primaryColor = '#ff5252',
   } = theme || {}

   return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: primaryColor }]}>
         <View style={[styles.header, { backgroundColor: primaryColor }]}>
            <Text style={styles.headerTitle}>Settings</Text>
         </View>

         <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.btnContent}>
               <TouchableOpacity
                  onPress={toggleTheme}
                  style={[styles.button, { backgroundColor: primaryColor }]}
               >
                  <Text style={styles.buttonText}>Change Theme</Text>
               </TouchableOpacity>
            </View>

            <View style={styles.btnContent}>
               {uid ? (
                  <TouchableOpacity
                     onPress={handleLogout}
                     style={[styles.button, { backgroundColor: primaryColor }]}
                  >
                     <Text style={styles.buttonText}>Logout</Text>
                  </TouchableOpacity>
               ) : (
                  <>
                     <TouchableOpacity
                        onPress={handleLogin}
                        style={[styles.button, { backgroundColor: primaryColor }]}
                     >
                        <Text style={styles.buttonText}>Login</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={handleRegister}
                        style={[styles.button, { backgroundColor: primaryColor }]}
                     >
                        <Text style={styles.buttonText}>Register</Text>
                     </TouchableOpacity>
                  </>
               )}
            </View>
         </View>
      </SafeAreaView>
   )
}

export default User

const styles = StyleSheet.create({
   safeArea: {
      flex: 1,
   },
   header: {
      paddingVertical: 15,
      alignItems: 'center',
   },
   headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ffffff',
   },
   container: {
      flex: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20,
      paddingTop: 20,
   },
   btnContent: {
      width: '100%',
      flexDirection: 'row',
      gap: 12,
      justifyContent: 'center',
      marginBottom: 20,
   },
   button: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
   },
   buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
   },
})
