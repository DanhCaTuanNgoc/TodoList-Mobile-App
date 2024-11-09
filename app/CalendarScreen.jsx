import React, { useState, useEffect } from 'react'
import {
   View,
   Text,
   TouchableOpacity,
   Modal,
   TextInput,
   StyleSheet,
   Keyboard,
   TouchableWithoutFeedback,
   Alert,
   ScrollView,
   FlatList,
   SafeAreaView,
   KeyboardAvoidingView,
   Platform,
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Ionicons } from '@expo/vector-icons'
import { addEvent, fetchEvents, deleteEvent } from '../store/event/eventAction'
import { useSelector, useDispatch } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useTheme } from '../constants/ThemeContext'
import { Event } from '@/components'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
   handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
   }),
})

function CalendarScreen({ navigation }) {
   const dispatch = useDispatch()
   const [eventsList, setEventsList] = useState({})
   const [selectedDate, setSelectedDate] = useState('')
   const [isModalVisible, setIsModalVisible] = useState(false)
   const [notificationTime, setNotificationTime] = useState('')
   const [newEvent, setNewEvent] = useState('')
   const [eventTime, setEventTime] = useState(new Date())
   const [showTimePicker, setShowTimePicker] = useState(false)
   const today = new Date().toISOString().split('T')[0]
   const { events } = useSelector((state) => state.eventState)
   const { uid } = useSelector((state) => state.userState)
   const { theme } = useTheme()
   const backgroundColor = theme?.backgroundColor || '#ffffff'
   const backgroundContent = theme?.backgroundContent || '#ffffff'
   const textColor = theme?.textColor || '#000000'
   const primaryColor = theme?.primaryColor || '#ff5252'

   useEffect(() => {
      async function fetchData() {
         if (uid) {
            await dispatch(fetchEvents(uid))
         }
      }
      fetchData()
      renderAllEventsList()
   }, [uid])

   useEffect(() => {
      registerForPushNotificationsAsync()
   }, [])

   const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
         const { status } = await Notifications.requestPermissionsAsync()
         finalStatus = status
      }

      if (finalStatus !== 'granted') {
         Alert.alert('Failed to get push token for push notification!')
         return
      }
   }

   const scheduleEventNotification = async (
      eventTitle,
      eventDate,
      eventTime,
      notificationHours,
   ) => {
      try {
         const [hours, minutes] = eventTime.split(':')
         const scheduledDate = new Date(eventDate)
         scheduledDate.setHours(parseInt(hours), parseInt(minutes), 0)

         const notificationDate = new Date(
            scheduledDate.getTime() - notificationHours * 60 * 60 * 1000,
         )

         if (notificationDate > new Date()) {
            await Notifications.scheduleNotificationAsync({
               content: {
                  title: 'Event Reminder',
                  body: `Your event "${eventTitle}" starts in ${notificationHours} hour${notificationHours === 1 ? '' : 's'}`,
                  sound: true,
               },
               trigger: {
                  date: notificationDate,
               },
            })
         }
      } catch (error) {
         console.log('Notification scheduling error:', error)
      }
   }

   const onDayPress = (day) => {
      setSelectedDate(day.dateString)
      setIsModalVisible(true)
   }

   const handleAddEvent = async () => {
      if (newEvent.trim() !== '' && notificationTime !== '' && selectedDate !== '') {
         try {
            const hours = eventTime.getHours().toString().padStart(2, '0')
            const minutes = eventTime.getMinutes().toString().padStart(2, '0')
            const formatted = `${hours}:${minutes}`

            await dispatch(
               addEvent(
                  uid,
                  newEvent,
                  selectedDate,
                  formatted,
                  parseFloat(notificationTime),
               ),
            )

            await scheduleEventNotification(
               newEvent,
               selectedDate,
               formatted,
               parseFloat(notificationTime),
            )

            setNewEvent('')
            setIsModalVisible(false)
         } catch (error) {
            console.log('ADD ERROR :', error.message)
         }
      }
   }

   const handleDelete = async (id) => {
      try {
         await dispatch(deleteEvent(id))
         await dispatch(fetchEvents(uid))
      } catch (error) {
         console.log('DELETE ERROR :', error.message)
      }
   }

   const renderAllEventsList = () => {
      if (events.length > 0) {
         return events.map((event, index) => (
            <View key={event.id} style={[styles.dateContainer]}>
               <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.dateHeader, { color: primaryColor }]}>
                     {event.start_at} at {event.time_at}
                  </Text>
               </View>
               <View
                  key={index}
                  style={[styles.eventItem, { backgroundColor: backgroundContent }]}
               >
                  <Text style={[styles.eventText, { color: textColor }]}>
                     {event.title}
                  </Text>
                  <TouchableOpacity
                     // onPress={() => handleDelete(event.id)}
                     style={styles.deleteButton}
                  >
                     <Ionicons name="trash" size={24} color={primaryColor} />
                  </TouchableOpacity>
               </View>
            </View>
         ))
      }
      return <Text style={styles.emptyText}>No events.</Text>
   }

   const onTimeChange = (event, selectedTime) => {
      setShowTimePicker(Platform.OS === 'ios')
      if (selectedTime) {
         setEventTime(selectedTime)
      }
   }

   return (
      <SafeAreaView style={{ backgroundColor: primaryColor, flex: 1 }}>
         <View style={[styles.header, { backgroundColor: primaryColor }]}>
            <Text style={[styles.headerText]}>My Events</Text>
            <TouchableOpacity
               style={styles.todayButton}
               onPress={() => {
                  setSelectedDate(today)
                  setIsModalVisible(true)
               }}
            >
               <Ionicons name="calendar-outline" size={20} color="#000" />
               <Text style={styles.todayText}>Today</Text>
            </TouchableOpacity>
         </View>
         <View style={{ backgroundColor: backgroundContent }}>
            <Calendar
               onDayPress={onDayPress}
               markedDates={{
                  [today]: {
                     selected: true,
                     marked: true,
                     selectedColor: primaryColor,
                  },
                  ...Object.keys(events).reduce((acc, key) => {
                     acc[key] = { marked: true }
                     return acc
                  }, {}),
               }}
            />
         </View>
         <View style={[styles.container, { backgroundColor }]}>
            {uid ? (
               <FlatList
                  data={events}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                     <Event event={item} onDelete={handleDelete} />
                  )}
                  ListEmptyComponent={<Text style={styles.emptyText}>No events.</Text>}
               />
            ) : (
               <View>
                  <Text style={styles.emptyText}>Please login to create your events</Text>
               </View>
            )}
         </View>
         <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsModalVisible(false)}
         >
            <TouchableOpacity
               style={styles.modalContainer}
               activeOpacity={1}
               onPressOut={() => setIsModalVisible(false)}
            >
               <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  style={[styles.modalContent, { backgroundColor: backgroundColor }]}
               >
                  <View style={styles.modalHeader}>
                     <Text style={[styles.modalTitle, { color: textColor }]}>
                        Add Event on {selectedDate}
                     </Text>
                     <TouchableOpacity
                        onPress={() => setIsModalVisible(false)}
                        style={styles.closeButton}
                     >
                        <Ionicons name="close" size={24} color={textColor} />
                     </TouchableOpacity>
                  </View>

                  <ScrollView
                     style={[styles.formContainer, { backgroundColor: backgroundColor }]}
                     showsVerticalScrollIndicator={false}
                  >
                     <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: textColor }]}>
                           Event Name *
                        </Text>
                        <TextInput
                           placeholder="Enter event name"
                           placeholderTextColor="#666"
                           value={newEvent}
                           onChangeText={setNewEvent}
                           style={[
                              styles.modalInput,
                              {
                                 color: textColor,
                                 backgroundColor: backgroundColor,
                                 borderRadius: 8,
                                 paddingHorizontal: 12,
                              },
                           ]}
                           autoFocus={true}
                           returnKeyType="next"
                        />
                     </View>

                     <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: textColor }]}>
                           Notification Time (hours before event) *
                        </Text>
                        <TextInput
                           placeholder="e.g., 1.5 for 1 hour 30 minutes"
                           placeholderTextColor="#666"
                           value={notificationTime}
                           onChangeText={setNotificationTime}
                           keyboardType="decimal-pad"
                           style={[
                              styles.modalInput,
                              {
                                 color: textColor,
                                 backgroundColor: backgroundColor,
                                 borderRadius: 8,
                                 paddingHorizontal: 12,
                              },
                           ]}
                           returnKeyType="done"
                        />
                     </View>

                     <View style={styles.inputGroup}>
                        <Text
                           style={[styles.label, { color: textColor, marginBottom: 0 }]}
                        >
                           Event Time *
                        </Text>
                        <TouchableOpacity
                           onPress={() => setShowTimePicker(true)}
                           style={[
                              styles.timePickerButton,
                              {
                                 backgroundColor: backgroundColor,
                                 borderRadius: 8,
                                 padding: 12,
                                 borderWidth: 1,
                                 borderColor: '#ccc',
                                 flexDirection: 'row',
                                 alignItems: 'center',
                                 justifyContent: 'space-between',
                              },
                           ]}
                        >
                           <Text style={{ color: textColor, fontSize: 16 }}>
                              {eventTime.toLocaleTimeString([], {
                                 hour: '2-digit',
                                 minute: '2-digit',
                              })}
                           </Text>
                        </TouchableOpacity>
                        {showTimePicker && (
                           <DateTimePicker
                              value={eventTime}
                              mode="time"
                              is24Hour={true}
                              display="default"
                              onChange={onTimeChange}
                              style={{ marginTop: 8 }}
                           />
                        )}
                     </View>
                  </ScrollView>

                  <TouchableOpacity
                     style={[
                        styles.addButton,
                        {
                           backgroundColor: primaryColor,
                           opacity: !newEvent || !notificationTime ? 0.5 : 1,
                           marginBottom: 20,
                           elevation: 3,
                           shadowColor: '#000',
                           shadowOffset: { width: 0, height: 2 },
                           shadowOpacity: 0.25,
                           shadowRadius: 3.84,
                        },
                     ]}
                     onPress={handleAddEvent}
                     disabled={!newEvent || !notificationTime}
                  >
                     <Text style={[styles.addButtonText, { letterSpacing: 0.5 }]}>
                        Add Event
                     </Text>
                  </TouchableOpacity>
               </KeyboardAvoidingView>
            </TouchableOpacity>
         </Modal>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom: 10,
      paddingHorizontal: 15,
      backgroundColor: '#FF5252',
      elevation: 4,
   },
   headerText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 0.5,
   },
   todayButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFF',
      padding: 8,
      borderRadius: 20,
      elevation: 2,
   },
   todayText: {
      color: '#000',
      marginLeft: 8,
      fontWeight: '500',
   },
   container: {
      flex: 1,
      paddingHorizontal: 15,
      borderColor: '#ccc',
      borderTopWidth: 0.5,
   },
   taskContainer: {
      flex: 1,
      marginTop: 15,
   },
   eventItem: {
      backgroundColor: '#ffffff',
      padding: 16,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 12,
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
      fontWeight: '500',
   },
   emptyText: {
      textAlign: 'center',
      color: '#888',
      marginTop: 20,
      fontSize: 16,
   },
   dateContainer: {
      marginVertical: 10,
   },
   dateHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
      letterSpacing: 0.5,
   },
   selectedDateText: {
      textAlign: 'center',
      marginVertical: 10,
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 0.5,
   },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 20,
   },
   modalContent: {
      width: '100%',
      maxWidth: 400,
      padding: 24,
      backgroundColor: '#fff',
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
   },
   modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 0.5,
   },
   closeButton: {
      padding: 8,
      borderRadius: 20,
   },
   modalInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      marginTop: 8,
      marginBottom: 20,
      paddingVertical: 12,
      fontSize: 16,
   },
   addButton: {
      backgroundColor: '#FF5252',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
   },
   addButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
   },
   timePicker: {
      width: '100%',
      height: '100%',
   },
   timePickerContainer: {
      marginTop: 8,
   },
   label: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
      letterSpacing: 0.3,
   },
   notificationTimeContainer: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 10,
      marginBottom: 20,
      justifyContent: 'center',
   },
})

export default CalendarScreen
