import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons' // Cần cài đặt expo-vector-icons nếu chưa có
import { completeTask, fetchTasks, recompleteTask } from '@/store/tasks/taskAction'
import { useDispatch, useSelector } from 'react-redux'

const Task = ({ info, onDelete }) => {
   const [completed, setCompleted] = useState(info.completed)
   const { uid } = useSelector((state) => state.userState)
   const dispatch = useDispatch()

   // Hàm để đánh dấu đã hoàn thành
   const toggleComplete = async () => {
      if (completed == 0 && uid !== undefined && info.id !== undefined) {
         try {
            await dispatch(completeTask(uid, info.id))
            await dispatch(fetchTasks(uid))
         } catch (error) {
            console.log('Error : ', error.message)
         }
      } else {
         try {
            await dispatch(recompleteTask(uid, info.id))
            await dispatch(fetchTasks(uid))
         } catch (error) {
            console.log('Error : ', error.message)
         }
      }
      setCompleted(!completed)
   }

   return (
      <View style={styles.taskContainer}>
         {/* Nút hình tròn kiểu radio */}
         <TouchableOpacity onPress={toggleComplete} style={styles.radioButton}>
            {completed ? (
               <Ionicons name="radio-button-on" size={20} color="#FF5252" />
            ) : (
               <Ionicons name="radio-button-off" size={20} color="#A9A9A9" />
            )}
         </TouchableOpacity>
         {/* Nhiệm vụ */}
         <TouchableOpacity onPress={toggleComplete} style={styles.taskContent}>
            <Text style={[styles.taskText, completed && styles.completedText]}>
               {info.title}
            </Text>
         </TouchableOpacity>

         {/* Nút xóa */}
         <TouchableOpacity onPress={() => onDelete(info.id)} style={styles.deleteButton}>
            <Ionicons name="trash" size={24} color="#FF5252" />
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   taskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
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
      color: '#333',
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
