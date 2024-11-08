import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { Welcome, Home, User, Login, Register, Calendar } from './app/'
import { Provider } from 'react-redux'
import store from './store/store'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const MainTab = () => {
   return (
      <Tab.Navigator
         initialRouteName="Home"
         screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
               let iconName

               if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline'
               } else if (route.name === 'User') {
                  iconName = focused ? 'person' : 'person-outline'
               } else if (route.name === 'Calendar') {
                  iconName = focused ? 'calendar' : 'calendar-outline'
               }

               return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
         })}
      >
         <Tab.Screen name="Home" component={Home} />
         <Tab.Screen name="Calendar" component={Calendar} />
         <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
   )
}

export default function App() {
   return (
      <Provider store={store}>
         <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
               <Stack.Navigator
                  screenOptions={{ headerShown: true }}
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
      </Provider>
   )
}
