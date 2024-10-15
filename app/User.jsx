import { View, Text, Button, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearTasks } from '@/store/tasks/taskReducer'

function User({ navigation }) {
   const [uid, setUid] = useState(null)
   const dispatch = useDispatch()

   useEffect(() => {
      const getUID = async () => {
         try {
            const storedUid = await AsyncStorage.getItem('userId')
            const userUuid = await AsyncStorage.getItem('UUID')
            if (userUuid && !storedUid) {
               setUid(userUuid)
            } else {
               setUid(storedUid)
            }
         } catch (err) {
            console.log(err.message)
         }
      }
      getUID()
   }, [])

   const handleLogout = async () => {
      try {
         await AsyncStorage.removeItem('userId')
         dispatch(clearTasks())
         navigation.navigate('Welcome')
      } catch (err) {
         Alert.alert('Logout Failed', err.message)
      }
   }
   const handleLogin = () => navigation.navigate('Login')

   const handleRegister = () => navigation.navigate('Register')

   return (
      <SafeAreaView>
         <View>
            <Text>User</Text>
            {uid ? (
               <Button title="Logout" onPress={handleLogout} />
            ) : (
               <View>
                  <Button title="Login" onPress={handleLogin} />
                  <Button title="Register" onPress={handleRegister} />
               </View>
            )}
         </View>
      </SafeAreaView>
   )
}

export default User
