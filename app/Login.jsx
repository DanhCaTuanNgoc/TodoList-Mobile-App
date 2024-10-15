import React from 'react'
import { View, Text, Button, StyleSheet, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import userLogin from '../store/user/userAction'
import { COLORS, FONTS, SIZES } from '@/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Login({ navigation }) {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()

   const handleLogin = async () => { 
      if (email.trim() != '' && password.trim() != '') {
         try {
            // const response = await fetch('http://192.168.1.6:3000/users/login', {
            //    method: 'POST',
            //    headers: {
            //       'Content-Type': 'application/json',
            //    },
            //    body: JSON.stringify({ email, password }),
            // })

            // const data = await response.json()
            // if (!response.ok) {
            //    throw new Error(data.error || 'Login failed')
            // }

            // await AsyncStorage.setItem('userId', data.id.toString())
            await dispatch(userLogin(email, password))
            setEmail('')
            setPassword('')
            navigation.navigate('MainTab')
         } catch (err) {
            Alert.alert('Erorr!!!', err.message)
         }
      } else {
         Alert.alert('Vanlidation Error', 'Please fill all fields')
      }
   }

   return (
      <View>
         <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'black'}
            onChangeText={setEmail}
         />
         <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={'black'}
            onChangeText={setPassword}
         />
         <Button title="Login" onPress={handleLogin} />
      </View>
   )
}

export default Login

const styles = StyleSheet.create({
   input: {
      backgroundColor: COLORS.white,
      padding: SIZES.padding,
      borderColor: 'black',
      borderWidth: 1,
      width: '80%',
   },
})
