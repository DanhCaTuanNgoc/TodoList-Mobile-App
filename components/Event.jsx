import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons' // Cần cài đặt expo-vector-icons nếu chưa có
import { completeTask, fetchTasks, recompleteTask } from '@/store/tasks/taskAction'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '../constants/ThemeContext'

const Event = ({ event, onDelete }) => {
   const [completed, setCompleted] = useState(event.completed)
   const { uid } = useSelector((state) => state.userState)
   const dispatch = useDispatch()

   const { theme } = useTheme()
   const backgroundColor = theme?.backgroundColor || '#ffffff'
   const backgroundContent = theme?.backgroundContent || '#ffff'
   const textColor = theme?.textColor || '#000000'
   const primaryColor = theme?.primaryColor || '#ff5252'

   return (
      <View key={event.id} style={[styles.dateContainer]} >
         <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.dateHeader, { color: primaryColor }]}>
               {event.start_at} at {event.time_at}
            </Text>
         </View>
         <View
            key={event.id.toString()}
            style={[styles.eventItem, { backgroundColor: backgroundContent }]}
         >
            <Text style={[styles.eventText, { color: textColor }]}>{event.title}</Text>
            <TouchableOpacity
               onPress={() => onDelete(event.id)}
               style={styles.deleteButton}
            >
               <Ionicons name="trash" size={24} color={primaryColor} />
            </TouchableOpacity>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   safeContainer: {
      flex: 1,
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#FF5252',
   },
   headerText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
   },
   todayButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFF',
      padding: 8,
      borderRadius: 20,
   },
   todayText: {
      color: '#000',
      marginLeft: 8,
   },
   container: {
      flex: 1,
      paddingHorizontal: 15,
   },
   taskContainer: { marginTop: 15, marginBottom: 20 },
   eventItem: {
      backgroundColor: '#ffffff',
      padding: 16,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 5,
   },
   eventText: {
      fontSize: 16,
      color: '#333',
      flex: 1,
   },
   emptyText: {
      textAlign: 'center',
      color: '#888',
      marginTop: 20,
   },
   dateContainer: {
      marginVertical: 10,
   },
   dateHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
   },
   selectedDateText: {
      textAlign: 'center',
      marginVertical: 10,
      fontSize: 16,
      fontWeight: 'bold',
   },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
   },
   modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   modalInput: {
      borderBottomWidth: 1,
      marginBottom: 20,
      borderBottomColor: '#ccc',
      paddingVertical: 10,
   },
   addButton: {
      backgroundColor: '#FF5252',
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
   },
   addButtonText: {
      color: '#fff',
      fontWeight: 'bold',
   },
   timePicker: {},
   label: {
      fontWeight: 'bold',
   },
   notificationTimeContainer: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 10,
      marginBottom: 20,
      justifyContent: 'center',
   },
})

export default Event
