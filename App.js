import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { Welcome, Home, Setting, Login, Register, CalendarScreen } from './app/'
import { ThemeProvider, useTheme } from './constants/ThemeContext'
import { Provider } from 'react-redux'
import store from './store/store'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const MainTab = () => {
   const { theme } = useTheme()
   const backgroundColor = theme?.backgroundColor || '#ffff'
   const primaryColor = theme?.primaryColor || '#000'
   const backgroundTabBar = theme?.backgroundTabBar || '#ffff'
   return (
      <Tab.Navigator
         initialRouteName="Home"
         screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
               let iconName

               if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline'
               } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline'
               } else if (route.name === 'CalendarScreen') {
                  iconName = focused ? 'calendar' : 'calendar-outline'
               }

               return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: primaryColor,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
               backgroundColor: backgroundTabBar,
            },
         })}
      >
         <Tab.Screen name="Home" component={Home} />
         <Tab.Screen name="CalendarScreen" component={CalendarScreen} />
         <Tab.Screen name="Settings" component={Setting} />
      </Tab.Navigator>
   )
}
export default function App() {
   return (
      <Provider store={store}>
         <ThemeProvider>
            <SafeAreaView style={{ flex: 1 }}>
               <GestureHandlerRootView>
                  <NavigationContainer>
                     <Stack.Navigator
                        screenOptions={{ headerShown: false }}
                        initialRouteName="Welcome"
                     >
                        <Stack.Screen name="Welcome" component={Welcome} />
                        <Stack.Screen
                           name="Login"
                           component={Login}
                           options={{ headerShown: false }}
                        />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen
                           name="MainTab"
                           component={MainTab}
                           options={{ headerShown: false }}
                        />
                     </Stack.Navigator>
                  </NavigationContainer>
               </GestureHandlerRootView>
            </SafeAreaView>
         </ThemeProvider>
      </Provider>
   )
}
