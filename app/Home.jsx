import {
   View,
   Text,
   TextInput,
   StyleSheet,
   Alert,
   ActivityIndicator,
   FlatList,
} from 'react-native'
import { Button, Input } from '@ant-design/react-native'
import { COLORS, SIZES } from '@/constants'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, fetchTasks, mergeTasks, deleteTask } from '../store/tasks/taskAction'
import { Task } from '../components/index'
import { ScrollView } from 'react-native-gesture-handler'

function Home({ navigation }) {
   // lấy mảng tasks từ REDUX :
   const dispatch = useDispatch()
   const { tasks, completed, incompleted } = useSelector((state) => state.taskState)
   const { uid, name } = useSelector((state) => state.userState)
   const [inputValue, setInputValue] = useState('')
   const [taskList, setTaskList] = useState([])
   // const [completedTask, setCompletedTask] = useState([])
   // const [incompletedTask, setIncompletedTask] = useState([])

   useEffect(() => {
      if (uid) {
         getUser()
      } else {
         getGuestTask()
      }
   }, [uid])

   // New useEffect to update completed and incomplete tasks whenever taskList changes
   // useEffect(() => {
   //    setCompletedTask(taskList.filter((task) => task.completed === true))
   //    setIncompletedTask(taskList.filter((task) => task.completed === false))
   // }, [taskList])

   const getUser = async () => {
      if (uid) {
         await dispatch(fetchTasks(uid))
      }
   }

   const getGuestTask = async () => {
      try {
         const guestTask = await AsyncStorage.getItem('guestTask')
         if (guestTask) {
            setTaskList(JSON.parse(guestTask))
         } else {
            await AsyncStorage.setItem('guestTask', JSON.stringify([]))
            setTaskList([])
         }
      } catch (error) {
         Alert.alert('Error', 'Failed to fetch guest tasks.')
      }
   }

   const handleAddTask = async () => {
      if (inputValue.trim() !== '') {
         if (uid) {
            await dispatch(addTask(uid, inputValue))
               .then(() => {
                  setInputValue('')
                  Alert.alert('Success', 'Task added successfully.')
               })
               .catch((err) => {
                  console.log('Error adding task:', err)
                  Alert.alert('Error', 'Failed to add task.')
               })
         } else {
            const newTask = {
               title: inputValue,
               completed: 0,
               created_at: new Date().getTime(),
            }
            const existingTasks = await AsyncStorage.getItem('guestTask')
            let tasksArray = []
            if (existingTasks !== null && existingTasks !== undefined) {
               tasksArray = JSON.parse(existingTasks)
            }
            // const tasksArray = existingTasks ? JSON.parse(existingTasks) : []
            tasksArray.push(newTask) // Thêm tác vụ mới vào danh sách hiện có
            await AsyncStorage.setItem('guestTask', JSON.stringify(tasksArray))
            setTaskList(tasksArray) // Cập nhật trạng thái với danh sách mới
            setInputValue('') // Xóa input sau khi thêm tác vụ
            Alert.alert('Success', 'Task added successfully as guest.')
         }
      } else {
         Alert.alert('Error', 'Task title cannot be empty.')
      }
   }

   const handleDelete = async (id) => {
      if (uid !== undefined && id !== undefined) {
         try {
            await dispatch(deleteTask(uid, id))
         } catch (error) {
            console.log('Delete errror :', error.message)
         }
      }
   }

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View style={styles.container}>
            <Text style={styles.title}>Tasks</Text>
            <Text>Xin chào : {name}</Text>
            <View style={styles.inputContainer}>
               <TextInput
                  style={styles.input}
                  placeholder="task..."
                  value={inputValue}
                  onChangeText={setInputValue}
               />
               <Button
                  onPress={handleAddTask}
                  size="medium"
                  style={styles.btn}
                  textStyle={{ color: 'white' }}
               >
                  Add Task
               </Button>
            </View>
            <ScrollView style={styles.taskContainer}>
               <View>
                  <Text>Chưa hoàn thành</Text>
                  {incompleted.length > 0 ? (
                     <FlatList
                        data={incompleted}
                        key={(item) => item.id}
                        renderItem={({ item }) => (
                           <Task info={item} onDelete={handleDelete} />
                        )}
                        style={styles.taskContainer}
                     />
                  ) : (
                     <Text>Trống</Text>
                  )}
               </View>
               <View>
                  <Text>Đã hoàn thành</Text>
                  {completed.length > 0 ? (
                     <FlatList
                        data={completed}
                        key={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                           <Task info={item} onDelete={handleDelete} />
                        )}
                        style={styles.taskContainer}
                     />
                  ) : (
                     <Text>Trống</Text>
                  )}
               </View>
            </ScrollView>
         </View>
      </SafeAreaView>
   )
}

export default Home

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 10,
   },
   taskContainer: {
      marginVertical: 5, // Add some space between tasks
      paddingHorizontal: 10,
      width: '100%',
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SIZES.padding,
      marginVertical: 5, // Add some space between tasks
      paddingHorizontal: 10,
      width: '100%',
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
   btn: {
      width: '20%',
      height: '80%',
      marginBottom: 15,
      backgroundColor: '#FF5252',
   },
})
