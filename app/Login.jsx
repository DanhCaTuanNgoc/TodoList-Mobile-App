import React, { Fragment } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Button } from '@ant-design/react-native'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS, FONTS, SIZES } from '@/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userLogin } from '@/store/user/userAction'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setUID } from '@/store/user/userReducer'

function Login({ navigation }) {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()

   const handleLogin = async () => {
      if (email.trim() != '' && password.trim() != '') {
         try {
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
      <SafeAreaView style={{ flex: 1 }}>
         <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
            <Button type="primary" onPress={handleLogin} style={styles.btn}>
               Login
            </Button>
         </View>
      </SafeAreaView>
   )
}

export default Login

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
   },
   input: {
      backgroundColor: COLORS.white,
      padding: SIZES.padding,
      borderColor: 'black',
      borderWidth: 0.5,
      width: '80%',
      marginBottom: 15,
      borderRadius: 4,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
   },
   btn: {
      width: '80%',
      marginBottom: 10,
   },
   back_link: {
      color: 'blue',
      fontSize: 16,
   },
})
