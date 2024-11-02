import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Agenda } from 'react-native-calendars';

function Calendar() {
   const [events, setEvents] = useState({});
   const [selectedDate, setSelectedDate] = useState('');
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [newEvent, setNewEvent] = useState('');

   useEffect(() => {
      // Initialize some sample events for demonstration
      setEvents({
         '2024-11-01': [{ name: 'Sample Event', height: 50 }],
         '2024-11-02': [{ name: 'Another Event', height: 50 }],
      });
   }, []);

   // Function to handle adding a new event
   const handleAddEvent = () => {
      if (newEvent.trim()) {
         setEvents((prevEvents) => {
            const updatedEvents = { ...prevEvents };
            if (!updatedEvents[selectedDate]) {
               updatedEvents[selectedDate] = [];
            }
            updatedEvents[selectedDate].push({ name: newEvent, height: 50 });
            return updatedEvents;
         });
         setNewEvent('');
         setIsModalVisible(false);
      }
   };

   return (
      <View style={{ flex: 1 }}>
         <Agenda
            items={events}
            selected={new Date().toISOString().split('T')[0]}
            renderItem={(item) => (
               <View style={{ backgroundColor: '#f9f9f9', padding: 10, marginVertical: 5 }}>
                  <Text>{item.name}</Text>
               </View>
            )}
            renderEmptyData={() => <Text>No Events</Text>}
            onDayPress={(day) => {
               setSelectedDate(day.dateString);
               setIsModalVisible(true);
            }}
         />

         {/* Modal to add a new event */}
         <Modal
            visible={isModalVisible}
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
         >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                  <Text>Add Event on {selectedDate}</Text>
                  <TextInput
                     placeholder="Event name"
                     value={newEvent}
                     onChangeText={setNewEvent}
                     style={{ borderBottomWidth: 1, marginBottom: 10 }}
                  />
                  <TouchableOpacity onPress={handleAddEvent}>
                     <Text style={{ color: 'blue' }}>Add Event</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </Modal>
      </View>
   );
}

export default Calendar;
