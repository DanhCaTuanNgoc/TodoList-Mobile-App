import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons' // Cần cài đặt expo-vector-icons nếu chưa có
import { completeTask, fetchTasks, recompleteTask } from '@/store/tasks/taskAction'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '../constants/ThemeContext'
import { memo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Task = ({ info, onDelete }) => {
   const [completed, setCompleted] = useState(info.completed)
   const { uid } = useSelector((state) => state.userState)
   const dispatch = useDispatch()

   const { theme } = useTheme()
   const backgroundColor = theme?.backgroundColor || '#ffffff'
   const backgroundContent = theme?.backgroundContent || '#ffff'
   const textColor = theme?.textColor || '#000000'
   const primaryColor = theme?.primaryColor || '#ff5252'

   const toggleComplete = async () => {
      if (uid) {
         if (info.completed == false && info.id !== undefined) {
            try {
               await dispatch(completeTask(uid, info.id))
               await dispatch(fetchTasks(uid))
               setCompleted(!completed)
            } catch (error) {
               console.log('Error : ', error.message)
            }
         } else {
            try {
               await dispatch(recompleteTask(uid, info.id))
               await dispatch(fetchTasks(uid))
               setCompleted(!completed)
            } catch (error) {
               console.log('Error : ', error.message)
            }
         }
      } else {
         try {
            const existingTasks = await AsyncStorage.getItem('guestTask')
            const tasksArray = existingTasks ? JSON.parse(existingTasks) : []
            
            const updatedTasks = tasksArray.map(task => {
               if (task.id === info.id) {
                  return {...task, completed: !task.completed}
               }
               return task
            })

            await AsyncStorage.setItem('guestTask', JSON.stringify(updatedTasks))
            setCompleted(!completed)
         } catch (error) {
            console.error('Error updating guest task:', error)
         }
      }
   }

   return (
      <View style={[styles.taskContainer, { backgroundColor: backgroundContent }]}>
         {/* Nút hình tròn kiểu radio */}
         <TouchableOpacity onPress={toggleComplete} style={styles.radioButton}>
            {completed ? (
               <Ionicons name="radio-button-on" size={20} color={primaryColor} />
            ) : (
               <Ionicons name="radio-button-off" size={20} color="#A9A9A9" />
            )}
         </TouchableOpacity>
         {/* Nhiệm vụ */}
         <TouchableOpacity onPress={toggleComplete} style={styles.taskContent}>
            <Text
               style={[
                  styles.taskText,
                  { color: textColor },
                  completed && styles.completedText,
               ]}
            >
               {info.title}
            </Text>
         </TouchableOpacity>

         {/* Nút xóa */}
         <TouchableOpacity onPress={() => onDelete(info.id)} style={styles.deleteButton}>
            <Ionicons name="trash" size={24} color={primaryColor} />
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   taskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      marginVertical: 8,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      width: '100%',
   },
   taskContent: {
      flex: 1,
   },
   taskText: {
      fontSize: 16,
   },
   completedText: {
      textDecorationLine: 'line-through',
      color: '#A9A9A9',
   },
   deleteButton: {
      marginLeft: 10,
   },
   radioButton: {
      marginRight: 10,
   },
})

export default Task
