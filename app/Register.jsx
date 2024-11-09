import React from 'react'
import {
   View,
   Text,
   StyleSheet,
   Alert,
   TextInput,
   TouchableOpacity,
   TouchableWithoutFeedback,
   Keyboard,
} from 'react-native'
import { useState } from 'react'
import { COLORS, SIZES } from '@/constants'
import { userRegister } from '@/store/user/userAction'
import { useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

function Register({ navigation }) {
   const [user_name, setUserName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [showPassword, setShowPassword] = useState(false)
   const dispatch = useDispatch()

   const handleRegister = async () => {
      if (email.trim() !== '' && password.trim() !== '' && user_name.trim() !== '') {
         try {
            await dispatch(userRegister(user_name.trim(), email.trim(), password.trim()))
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
               <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.navigate('Welcome')}
               >
                  <Ionicons name="arrow-back" size={24} color={COLORS.black} />
               </TouchableOpacity>

               <View style={styles.headerContainer}>
                  <Text style={styles.title}>Create Account</Text>
                  <Text style={styles.subtitle}>Sign up to get started</Text>
               </View>

               <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                     <Ionicons
                        name="person-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.icon}
                     />
                     <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor={COLORS.gray}
                        value={user_name}
                        onChangeText={setUserName}
                        autoCapitalize="words"
                     />
                  </View>

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
                        autoCapitalize="none"
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

                  <TouchableOpacity
                     style={styles.registerButton}
                     onPress={handleRegister}
                  >
                     <Text style={styles.registerButtonText}>Sign Up</Text>
                  </TouchableOpacity>

                  <View style={styles.footer}>
                     <Text style={styles.footerText}>Already have an account? </Text>
                     <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Login</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </SafeAreaView>
      </TouchableWithoutFeedback>
   )
}

export default Register
const styles = StyleSheet.create({
   safeArea: {
      flex: 1,
      backgroundColor: COLORS.white,
   },
   container: {
      flex: 1,
      padding: 20,
   },
   headerContainer: {
      marginTop: 20,
      marginBottom: 30,
   },
   title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: 5,
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
   registerButton: {
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
   },
   registerButtonText: {
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
   loginText: {
      color: COLORS.primary,
      fontSize: 16,
      fontWeight: '600',
   },
})
