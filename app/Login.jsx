import React from 'react'
import {
   View,
   Text,
   StyleSheet,
   Alert,
   TextInput,
   TouchableOpacity,
   Keyboard,
} from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { COLORS, SIZES } from '@/constants'
import { userLogin } from '@/store/user/userAction'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

function Login({ navigation }) {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [showPassword, setShowPassword] = useState(false)
   const dispatch = useDispatch()

   const handleLogin = async () => {
      if (email.trim() !== '' && password.trim() !== '') {
         try {
            await dispatch(userLogin(email, password))
            setEmail('')
            setPassword('')
            navigation.navigate('MainTab')
         } catch (err) {
            Alert.alert('Error', err.message)
         }
      } else {
         Alert.alert('Validation Error', 'Please fill all fields')
      }
   }

   return (
      <SafeAreaView style={styles.safeArea}>
         <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
               <Ionicons name="arrow-back" size={24} color={COLORS.black} />
            </TouchableOpacity>

            <View style={styles.headerContainer}>
               <Text style={styles.title}>Welcome Back</Text>
               <Text style={styles.subtitle}>Sign in to continue</Text>
            </View>

            <View style={styles.formContainer}>
               <View style={styles.inputContainer}>
                  <Ionicons
                     name="mail-outline"
                     size={20}
                     color={COLORS.gray}
                     style={styles.icon}
                  />
                  <TextInput
                     style={styles.input}
                     placeholder="Email"
                     placeholderTextColor={COLORS.gray}
                     value={email}
                     onChangeText={setEmail}
                     keyboardType="email-address"
                  />
               </View>

               <View style={styles.inputContainer}>
                  <Ionicons
                     name="lock-closed-outline"
                     size={20}
                     color={COLORS.gray}
                     style={styles.icon}
                  />
                  <TextInput
                     style={styles.input}
                     placeholder="Password"
                     placeholderTextColor={COLORS.gray}
                     value={password}
                     onChangeText={setPassword}
                     secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                     <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color={COLORS.gray}
                     />
                  </TouchableOpacity>
               </View>

               <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>Login</Text>
               </TouchableOpacity>

               <View style={styles.footer}>
                  <Text style={styles.footerText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                     <Text style={styles.registerText}>Register</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </SafeAreaView>
   )
}

export default Login

const styles = StyleSheet.create({
   safeArea: {
      flex: 1,
      backgroundColor: COLORS.white,
   },
   container: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingHorizontal: SIZES.padding * 2,
   },
   headerContainer: {
      marginTop: 50,
      marginBottom: 30,
   },
   title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: 10,
   },
   subtitle: {
      fontSize: 16,
      color: COLORS.gray,
   },
   formContainer: {
      marginTop: 20,
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.lightGray,
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 15,
      height: 55,
      borderWidth: 1,
      borderColor: COLORS.gray,
   },
   icon: {
      marginRight: 10,
   },
   input: {
      flex: 1,
      color: COLORS.black,
      fontSize: 16,
   },
   loginButton: {
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
   },
   loginButtonText: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: '600',
   },
   footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
   },
   footerText: {
      color: COLORS.gray,
      fontSize: 16,
   },
   registerText: {
      color: COLORS.primary,
      fontSize: 16,
      fontWeight: '600',
   },
})
