import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import { useState } from 'react'
import { COLORS, SIZES } from '@/constants'
import { userRegister } from '@/store/user/userAction'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addTask } from '@/store/tasks/taskAction'

function Register({ navigation }) {
   const [user_name, setUserName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()

   const handleRegister = async () => {
      if (email.trim() !== '' && password.trim() !== '' && user_name.trim() !== '') {
         try {
            const data = await dispatch(
               userRegister(user_name.trim(), email.trim(), password.trim()),
            )
            setUserName('')
               setEmail('')
               setPassword('')
               navigation.navigate('Login')
            
         } catch (err) {
            Alert.alert('Error', err.message || 'Registration failed.')
         }
      } else {
         Alert.alert('Validation Error', 'Please fill all fields')
      }
   }

   return (
      <View>
         <Text>Register</Text>
         <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={'black'}
            value={user_name}
            onChangeText={setUserName}
         />
         <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'black'}
            value={email}
            onChangeText={setEmail}
         />
         <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={'black'}
            value={password}
            onChangeText={setPassword}
         />
         <Button title="Register" onPress={handleRegister} />
      </View>
   )
}

export default Register
const styles = StyleSheet.create({
   input: {
      backgroundColor: COLORS.white,
      padding: SIZES.padding,
      borderColor: 'black',
      borderWidth: 0.5,
      width: '80%',
      marginBottom: 15,
      borderRadius: 4,
   },
})
