import { View, Text, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@ant-design/react-native/lib/button'
import { clearTasks } from '@/store/tasks/taskReducer'
import { clearUid, clearUserName } from '@/store/user/userReducer'

function User({ navigation }) {
   const dispatch = useDispatch()
   const { uuid, uid } = useSelector((state) => state.userState)

   const handleLogout = async () => {
      try {
         await AsyncStorage.removeItem('userId')
         await AsyncStorage.removeItem('userName')
         dispatch(clearTasks())
         dispatch(clearUid())
         dispatch(clearUserName())
         navigation.navigate('Welcome')
      } catch (err) {
         Alert.alert('Logout Failed', err.message)
      }
   }
   const handleLogin = () => navigation.navigate('Login')

   const handleRegister = () => navigation.navigate('Register')

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View style={styles.container}>
            <Text style={styles.title}>User</Text>
            {uid ? (
               <Button type="primary" onPress={handleLogout}>
                  Logout
               </Button>
            ) : (
               <View style={styles.btn_content}>
                  <Button type="primary" onPress={handleLogin} style={styles.btn}>
                     Login
                  </Button>
                  <Button type="primary" onPress={handleRegister} style={styles.btn}>
                     Register
                  </Button>
               </View>
            )}
         </View>
      </SafeAreaView>
   )
}

export default User

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      width: '100%',
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
   },
   btn_content: {
      width: '100%',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      justifyContent: 'center',
   },
   btn: {
      width: '45%',
      marginBottom: 10,
   },
   btn_logout: {
      width: '100%',
      marginBottom: 10,
   },
})
