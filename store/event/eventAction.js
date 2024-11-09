import {
   addEventsSuccess,
   fetchEventsSuccess,
   deleteEventsSuccess,
   clearEvents,
} from '../event/eventReducer'
import API_BASE_URL from '../IPv4'

export const addEvent =
   (uid, title, start_at, time_at, notification_time) => async (dispatch) => {
      try {
         const response = await fetch(`${API_BASE_URL}/events/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid, title, start_at, time_at, notification_time }),
         })
         if (!response.ok) {
            throw new Error('Network response was not ok')
         }
         const data = await response.json()
         await dispatch(addEventsSuccess(data))
      } catch (error) {
         console.log('ERPOR :', error.message)
      }
   }

export const fetchEvents = (uid) => async (dispatch) => {
   try {
      // dấu `` dùng để chứa tham số
      const response = await fetch(`${API_BASE_URL}/events/fetch/${uid}`, {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
         throw new Error('Network response was not ok')
      }
      const data = await response.json()
      await dispatch(fetchEventsSuccess(data.events))
   } catch (error) {
      console.log('ERROR :', error.message)
   }
}

export const deleteEvent = (id) => async (dispatch) => {
   try {
      const response = await fetch(`${API_BASE_URL}/events/delete/${id}`, {
         method: 'DELETE',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ id }),
      })
      if (!response.ok) {
         throw new Error('Network response was not ok')
      }
      const data = await response.json()
      await dispatch(deleteEventsSuccess(data))
   } catch (error) {
      console.log('ERROR :', error.message)
   }
}
