import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Button from '@ant-design/react-native/lib/button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useDispatch } from 'react-redux'
import { userLogin } from '@/store/user/userAction'
import { setUUID, setUID, setName } from '@/store/user/userReducer'

const Welcome = ({ navigation }) => {
   const dispatch = useDispatch()

   useEffect(() => {
      const getUser = async () => {
         const uid = await AsyncStorage.getItem('userId')
         const userName = await AsyncStorage.getItem('userName')
         const guest = await AsyncStorage.getItem('guestActive')
         if (uid) {
            await dispatch(setUID(uid))
            await dispatch(setName(userName))
            navigation.navigate('MainTab')
         } else if (guest) {
            navigation.navigate('MainTab')
         }
      }
      getUser()
   }, [])

   const handleGuest = async () => {
      await AsyncStorage.setItem('guestActive')
      navigation.navigate('MainTab')
   }
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View style={styles.container}>
            <Text>Welcome to TodoList</Text>
            <Text>Let's manage your task</Text>
            <Button
               type="primary"
               onPress={() => navigation.navigate('Login')}
               style={styles.btn}
            >
               Login
            </Button>
            <Button
               type="primary"
               onPress={() => navigation.navigate('Register')}
               style={styles.btn}
            >
               Register
            </Button>
            <Button type="primary" onPress={handleGuest} style={styles.btn}>
               As a guest
            </Button>
         </View>
      </SafeAreaView>
   )
}

export default Welcome

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 10,
   },
})
