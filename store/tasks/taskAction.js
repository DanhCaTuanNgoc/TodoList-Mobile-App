import {
   setLoading,
   setError,
   addTaskSuccess,
   fetchTasksSuccess,
   deleteTaskSuccess,
} from './taskReducer'
import API_BASE_URL from '../IPv4'

export const addTask = (uid, title) => async (dispatch) => {
   try {
      const response = await fetch(`${API_BASE_URL}/tasks/add`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ uid, title }),
      })
      if (!response.ok) {
         throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log(data)
      await dispatch(addTaskSuccess(data))
   } catch (error) {
      dispatch(setError('Error adding task'))
   }
}

export const fetchTasks = (uid) => async (dispatch) => {
   try {
      // dấu `` dùng để chứa tham số
      const response = await fetch(`${API_BASE_URL}/tasks/fetch/${uid}`, {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
         throw new Error('Network response was not ok')
      }
      const data = await response.json()
      await dispatch(fetchTasksSuccess(data.tasks))
   } catch (error) {
      dispatch(setError('Error fetch tasks'))
   }
}

export const mergeTasks = (uid, uuid) => async (dispatch) => {
   try {
      const response = await fetch(`${API_BASE_URL}/tasks/merge`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ uid, uuid }),
      })
      if (!response.ok) {
         throw new Error('Network response was not ok')
      }
      const data = response.json()

      //fetch task ra luoon
      if (data.uid) {
         fetchTasksSuccess(data.uid)
      }
   } catch (error) {
      console.log('ERPOR :', error.message)
   }
}

export const deleteTask = (uid, id) => async (dispatch) => {
   try {
      const response = await fetch(`${API_BASE_URL}/tasks/delete`, {
         method: 'DELETE',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ uid, id }),
      })

      if (!response.ok) {
         throw new Error('Network response was not ok')
      }

      const data = await response.json()
      await dispatch(deleteTaskSuccess(data.id))
   } catch (err) {
      console.error('ERROR:', err.message)
   }
}

export const completeTask = (uid, id) => async (dispatch) => {
   try {
      const response = await fetch(`${API_BASE_URL}/tasks/completed`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ uid, id }),
      })
      if (!response.ok) {
         throw new Error('Network response was not ok')
      }
   } catch (err) {
      console.error('ERROR:', err.message)
   }
}

export const recompleteTask = (uid, id) => async (dispatch) => {
   try {
      const response = await fetch(`${API_BASE_URL}/tasks/recompleted`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ uid, id }),
      })
      if (!response.ok) {
         throw new Error('Network response was not ok')
      }
   } catch (err) {
      console.error('ERROR:', err.message)
   }
}
