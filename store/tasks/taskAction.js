import { setLoading, setError, addTaskSuccess, fetchTasksSuccess } from './taskReducer'

export const addTask = (uid, title) => async (dispatch) => {
   dispatch(setLoading())
   try {
      const response = await fetch('http://192.168.1.6:3000/tasks/add', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ uid, title }),
      })
      if (!response.ok) {
         throw new Error('Network response was not ok')
      }
      const data = await response.json()
      dispatch(addTaskSuccess(data))
      return Promise.resolve()
   } catch (error) {
      dispatch(setError('Error adding task'))
      return Promise.reject(error)
   }
}

export const fetchTasks = (uid) => async (dispatch) => {
   try {
      // dấu `` dùng để chứa tham số
      const response = await fetch(`http://192.168.1.6:3000/tasks/fetch/${uid}`, {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
         throw new Error('Network response was not ok')
      }
      const data = await response.json()
      dispatch(fetchTasksSuccess(data.tasks))
      return Promise.resolve()
   } catch (error) {
      dispatch(setError('Error fetch tasks'))
      return Promise.reject(error)
   }
}

export const mergeTasks = (uid, uuid) => async (dispatch) => {
   try {
      const response = await fetch(`http://192.168.1.6:3000/tasks/merge`, {
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
         console.log(typeof data.uid)
         fetchTasks(data.uid)
      }
      return Promise.resolve()
   } catch (error) {
      return Promise.reject()
   }
}
