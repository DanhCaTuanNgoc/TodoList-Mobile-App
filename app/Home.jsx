import {
   View,
   Text,
   TextInput,
   StyleSheet,
   Alert,
   ActivityIndicator,
   FlatList,
} from 'react-native'
import Button from '../components/Button'
import { COLORS, SIZES } from '@/constants'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, fetchTasks, mergeTasks } from '../store/tasks/taskAction'

function Home({ navigation }) {
   const [inputValue, setInputValue] = useState('')
   const [todos, setTodos] = useState([])
   // const [uid, setUid] = useState(null)
   // lấy mảng tasks từ REDUX :
   const dispatch = useDispatch()
   const { tasks, loading, error, uid } = useSelector((state) => state.taskState)
   
   useEffect(() => {
      const getUid = async () => {
         try {
            const userUuid = await AsyncStorage.getItem('UUID')
            
            if (uid && userUuid) {
               try {
                  await dispatch(mergeTasks(uid, userUuid))
                  await AsyncStorage.removeItem('UUID')
               } catch (err) {
                  Alert.alert('ERROR MERGE TASKS : ', err.message)
               }
            } else if (uid) {
               dispatch(fetchTasks(uid))
               console.log('uid hoat dong')
            } else if (userUuid) {
               dispatch(fetchTasks(uid))
               console.log('uuid hoat dong')
            } else {
               console.log('KO CO 2 LOAI ID !')
            }
         } catch (err) {
            console.log('Error fetching userId from AsyncStorage:', err)
            Alert.alert('Error', 'Failed to retrieve user ID.')
         }
      }
      getUid()
   }, [])

   const handleAddTask = async () => {
      if (inputValue.trim() !== '') {
         if (uid) {
            dispatch(addTask(uid, inputValue))
               .then(() => {
                  setInputValue('') // Clear input after adding
                  // Alert.alert('Success', 'Task added successfully.')
               })
               .catch((err) => {
                  console.log('Error adding task:', err)
                  Alert.alert('Error', 'Failed to add task.')
               })
         }
      } else {
         Alert.alert('Error', 'Task title cannot be empty.')
         return
      }
   }

   // if (loading) {
   //    return (
   //       <SafeAreaView>
   //          <ActivityIndicator size="large" color="#0000ff" />
   //       </SafeAreaView>
   //    )
   // }

   return (
      <SafeAreaView>
         <View style={styles.container}>
            <Text style={styles.title}>Tasks</Text>
            <Text style={styles.title}>Xin chào : {uid}</Text>
            <TextInput
               style={styles.input}
               placeholder="task..."
               value={inputValue}
               onChangeText={setInputValue}
            />
            <Button title="Add Task" onPress={handleAddTask} />
            {tasks ? (
               <FlatList
                  data={tasks}
                  key={(item) => item.id}
                  renderItem={({ item }) => (
                     <Text style={styles.taskItem}>{item.title}</Text>
                  )}
               />
            ) : (
               <Text>ko co task nao</Text>
            )}
         </View>
      </SafeAreaView>
   )
}

export default Home

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 10,
   },
   input: {
      backgroundColor: COLORS.white,
      padding: SIZES.padding,
      borderColor: 'black',
      borderWidth: 1,
      width: '80%',
   },
   taskContainer: {
      flexDirection: 'row', // Align text and icon in a row
      alignItems: 'center', // Center vertically
      justifyContent: 'space-between', // Space out the text and icon
      marginVertical: 5, // Add some space between tasks
   },
   taskText: {
      flex: 1, // Allow text to take available space
   },
   deleteIcon: {
      marginLeft: 10, // Add space between text and icon
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
   },
   taskItem: {
      fontSize: 18,
      marginBottom: 10,
   },
   error: {
      color: 'red',
   },
})
