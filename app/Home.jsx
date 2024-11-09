import {
   View,
   Text,
   TextInput,
   StyleSheet,
   Alert,
   FlatList,
   TouchableOpacity,
   TouchableWithoutFeedback,
   Keyboard,
   ScrollView,
   StatusBar,
   SafeAreaView,
} from 'react-native'
import { Button } from '@ant-design/react-native'
import React, { useState, useEffect, memo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, fetchTasks, deleteTask } from '../store/tasks/taskAction'
import { Task } from '../components/index'
import { useTheme } from '../constants/ThemeContext'
import { COLORS } from '@/constants'
import { Ionicons } from '@expo/vector-icons'

function Home({ navigation }) {
   const dispatch = useDispatch()
   const { tasks, completed, incompleted } = useSelector((state) => state.taskState)
   const [taskList, setTaskList] = useState([])
   const { uid, name } = useSelector((state) => state.userState)
   const [inputValue, setInputValue] = useState('')
   const [toggleCompleted, setToggleCompleted] = useState(false)
   const { theme } = useTheme()
   const backgroundColor = theme?.backgroundColor || '#ffffff'
   const textColor = theme?.textColor || '#000000'
   const primaryColor = theme?.primaryColor || '#ff5252'

   useEffect(() => {
      if (uid) {
         getUser()
      } else {
         getGuestTask()
      }
   }, [uid])

   const getUser = async () => {
      if (uid) {
         await dispatch(fetchTasks(uid))
      }
   }

   const getGuestTask = async () => {
      try {
         const guestTaskString = await AsyncStorage.getItem('guestTask')
         const guestTasks = guestTaskString ? JSON.parse(guestTaskString) : []

         if (!guestTaskString) {
            await AsyncStorage.setItem('guestTask', JSON.stringify([]))
         }

         // Set all tasks
         setTaskList(guestTasks)
      } catch (error) {
         console.error('Error loading guest tasks:', error)
         Alert.alert('Error', 'Failed to load tasks')
      }
   }

   const handleAddTask = async () => {
      if (inputValue.trim() !== '') {
         if (uid) {
            await dispatch(addTask(uid, inputValue))
               .then(() => setInputValue(''))
               .catch(() => Alert.alert('Error', 'Failed to add task.'))
         } else {
            try {
               const existingTasks = await AsyncStorage.getItem('guestTask')
               const tasksArray = existingTasks ? JSON.parse(existingTasks) : []

               const newTask = {
                  id: Date.now().toString(),
                  title: inputValue,
                  completed: 0,
                  created_at: new Date().getTime(),
               }
               console.log(newTask)

               const updatedTasks = [...tasksArray, newTask]
               await AsyncStorage.setItem('guestTask', JSON.stringify(updatedTasks))

               // Update all states
               setTaskList(updatedTasks)
               setInputValue('')
            } catch (error) {
               console.error('Error adding guest task:', error)
               Alert.alert('Error', 'Failed to add task')
            }
         }
      } else {
         Alert.alert('Error', 'Task title cannot be empty.')
      }
   }

   const handleDelete = async (id) => {
      if (uid) {
         try {
            await dispatch(deleteTask(uid, id))
         } catch (error) {
            console.log('Delete error:', error.message)
         }
      } else {
         try {
            console.log(id)
            const existingTasks = await AsyncStorage.getItem('guestTask')
            const tasksArray = existingTasks ? JSON.parse(existingTasks) : []
            const updatedTasks = tasksArray.filter((task) => task.id !== id)
            await AsyncStorage.setItem('guestTask', JSON.stringify(updatedTasks))

            setTaskList(updatedTasks)
         } catch (error) {
            console.error('Error deleting guest task:', error)
            Alert.alert('Error', 'Failed to delete task')
         }
      }
   }

   const toggleCompletedIcon = () => setToggleCompleted(!toggleCompleted)
   const renderItem = (item) => <Task key={item.id} info={item} onDelete={handleDelete} />
   const renderContent = () => {
      return (
         <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.taskContainer, { backgroundColor: backgroundColor }]}
         >
            {uid ? (
               <>
                  {incompleted.length > 0 ? (
                     incompleted.map((item) => renderItem(item))
                  ) : (
                     <Text style={styles.emptyText}>No incomplete tasks</Text>
                  )}
                  <View
                     style={{
                        flexDirection: 'row',
                        flex: 1,
                        marginVertical: 5,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                     }}
                  >
                     <TouchableOpacity
                        style={styles.completedContainer}
                        onPress={toggleCompletedIcon}
                     >
                        <Text style={[styles.quantityText, { color: primaryColor }]}>
                           {completed.length}
                        </Text>
                        <Text style={[styles.sectionTitle, { color: primaryColor }]}>
                           Completed
                        </Text>
                        {toggleCompleted ? (
                           <Ionicons
                              name="chevron-down-outline"
                              size={17}
                              color={primaryColor}
                           />
                        ) : (
                           <Ionicons
                              name="chevron-forward-outline"
                              size={17}
                              color={primaryColor}
                           />
                        )}
                     </TouchableOpacity>
                  </View>
                  {toggleCompleted && completed.map((item) => renderItem(item))}
               </>
            ) : (
               <>
                  {taskList.length > 0 ? (
                     taskList.map((item) => renderItem(item))
                  ) : (
                     <Text style={styles.emptyText}>No incomplete tasks</Text>
                  )}
               </>
            )}
         </ScrollView>
      )
   }

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <SafeAreaView style={{ backgroundColor: primaryColor, flex: 1 }}>
            <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
            <View style={[styles.header, { backgroundColor: primaryColor }]}>
               <Text style={styles.headerTitle}>My Tasks</Text>
            </View>
            <View style={[styles.container, { backgroundColor }]}>
               <View style={styles.inputContainer}>
                  <TextInput
                     style={styles.input}
                     placeholder="Add a new task..."
                     placeholderTextColor={COLORS.gray}
                     value={inputValue}
                     onChangeText={setInputValue}
                  />
                  <TouchableOpacity
                     style={[styles.addButton, { backgroundColor: primaryColor }]}
                     onPress={handleAddTask}
                  >
                     <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
               </View>
               {renderContent()}
            </View>
         </SafeAreaView>
      </TouchableWithoutFeedback>
   )
}

export default Home

const styles = StyleSheet.create({
   header: {
      backgroundColor: '#FF5252',
      paddingTop: 5,
      paddingBottom: 20,
      alignItems: 'center',
   },
   headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ffffff',
   },

   greetingText: {
      fontSize: 18,
      color: '#ffffff',
   },
   container: {
      flex: 1,
      paddingHorizontal: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: -10,
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 0,
   },
   input: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 4,
      marginRight: 10,
   },
   addButton: {
      backgroundColor: '#FF5252',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
   },
   addButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
   },
   taskContainer: {
      flex: 1,
      marginTop: 15,
      marginBottom: 10,
      height: 'auto',
   },
   sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FF5252',
      marginBottom: 10,
      marginTop: 10,
   },
   taskList: {
      marginBottom: 15,
   },
   emptyText: {
      color: '#888',
      textAlign: 'center',
      marginVertical: 10,
   },
   quantityText: {
      fontSize: 18,
      fontWeight: 'bold',
   },
   completedContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      color: '#fff',
   },
})
