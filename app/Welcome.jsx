import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useDispatch } from 'react-redux'
const Welcome = ({ navigation }) => {
   const dispatch = useDispatch()
   const handleGuest = async () => {
      try {
         let userUuid = await AsyncStorage.getItem('UUID')
         if (!userUuid) {
            userUuid = uuid.v4()
            await AsyncStorage.setItem('UUID', userUuid)
            console.log('UUID đã được tạo thành công :', userUuid)
            navigation.navigate('MainTab')
         } else {
            console.log('UUID đã tồn tại.')
            navigation.navigate('MainTab')
         }
      } catch (error) {
         console.log('UUID error : ', error.message)
      }
   }
   return (
      <SafeAreaView>
         <View>
            <Text>Welcome to TodoList</Text>
            <Text>Let's manage your task</Text>
            <Button
               title="Login here"
               style={styles.button}
               onPress={() => navigation.navigate('Login')}
            />
            <Button
               title="Register here"
               style={styles.button}
               onPress={() => navigation.navigate('Register')}
            />
            <Button title="As a guest" style={styles.button} onPress={handleGuest} />
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({})

export default Welcome
