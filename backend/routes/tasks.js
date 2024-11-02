const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./todolist.db')

// Middleware
router.use(express.json())

// ADD TASK
router.post('/add', (req, res) => {
   const { uid, title } = req.body

   const sql = 'INSERT INTO task (user_id, title) VALUES (?, ?)'
   db.run(sql, [uid, title], function (err) {
      if (err) {
         console.error('Error inserting task:', err.message)
         return res
            .status(500)
            .json({ error: 'An error occurred while adding the task.' })
      }

      if (this.lastID === undefined) {
         console.error(
            'Error: lastID is undefined. Check the database schema and connection.',
         )
         return res
            .status(500)
            .json({ error: 'Unable to retrieve the last inserted ID.' })
      }

      res.status(201).json({
         id: this.lastID,
         title: title,
         completed: 0,
         created_at: new Date().toISOString(),
      })
   })
})

//GET TASKS
router.get('/fetch/:uid', (req, res) => {
   const { uid } = req.params
   if (!uid) {
      return res.status(400).json({ error: 'User ID is requierd.' })
   }
   const sql = 'SELECT * FROM task WHERE user_id = ?'
   db.all(sql, [uid], function (err, rows) {
      if (err) {
         return res.status(500).json({ error: 'An error occurred while fetch tasks' })
      }
      if (!rows || rows.length === 0) {
         return res.status(404).json({ error: 'No tasks found for this user.' })
      }
      const tasks = rows.map((task) => ({
         id: task.id,
         user_id: task.user_id,
         title: task.title,
         completed: Boolean(task.completed),
         created_at: task.created_at,
      }))
      //truyền bằng Object để chèn thêm biến khác nếu muốn
      return res.status(200).json({ tasks })
   })
})

//MERGE
router.post('/merge', (req, res) => {
   const { uid, uuid } = req.body
   const sql = 'UPDATE task SET user_id = ? WHERE user_id = ?'
   db.run(sql, [uid, uuid], (err) => {
      if (err) {
         return res.status(500).json({ err: 'An error occurred while merge tasks' })
      }
      return res.status(201).json({ uid })
   })
})

module.exports = router

// delete
router.delete('/delete', (req, res) => {
   const { uid, id } = req.body

   if (!uid || !id) {
      return res.status(400).json({ error: 'Missing uid or id in request' })
   }

   const sql = 'DELETE FROM task WHERE user_id = ? AND id = ?'
   db.run(sql, [uid, id], (err) => {
      if (err) {
         console.error('Database error:', err) // Log the error for debugging
         return res
            .status(500)
            .json({ error: 'An error occurred while deleting the task' })
      }
      return res.status(200).json({ uid, id })
   })
})

router.post('/completed', (req, res) => {
   const { uid, id } = req.body
   const sql = 'UPDATE task SET completed = 1 WHERE user_id = ? AND id = ?'
   db.run(sql, [uid, id], (err) => {
      if (err) {
         return res.status(500).json({ err: 'An error occurred while merge tasks' })
      }
      return res.status(201).json({ uid, id })
   })
})

router.post('/recompleted', (req, res) => {
   const { uid, id } = req.body
   const sql = 'UPDATE task SET completed = 0 WHERE user_id = ? AND id = ?'
   db.run(sql, [uid, id], (err) => {
      if (err) {
         return res.status(500).json({ err: 'An error occurred while merge tasks' })
      }
      return res.status(201).json({ uid, id })
   })
})
