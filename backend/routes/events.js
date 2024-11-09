const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./todolist.db')

// Middleware
router.use(express.json())

// ADD
router.post('/add', (req, res) => {
   const { uid, title, start_at, time_at, notification_time } = req.body

   const sql =
      'INSERT INTO event (user_id, title, start_at, time_at, notification_time) VALUES (?, ?, ?, ?, ?)'
   db.run(sql, [uid, title, start_at, time_at, notification_time], function (err) {
      if (err) {
         console.error('Error inserting event:', err.message)
         return res
            .status(500)
            .json({ error: 'An error occurred while adding the event.' })
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
         start_at: start_at,
         time_at: time_at,
         notification_time: notification_time,
      })
   })
})

//GET
router.get('/fetch/:uid', (req, res) => {
   const { uid } = req.params
   if (!uid) {
      return res.status(400).json({ error: 'User ID is requierd.' })
   }
   const sql = 'SELECT * FROM event WHERE user_id = ?'
   db.all(sql, [uid], function (err, rows) {
      if (err) {
         return res.status(500).json({ error: 'An error occurred while fetch events' })
      }
      //   if (!rows || rows.length === 0) {
      //      return res.status(404).json({ error: 'No events found for this user.' })
      //   }
      const events = rows.map((event) => ({
         id: event.id,
         user_id: event.user_id,
         title: event.title,
         start_at: event.start_at,
         time_at: event.time_at,
         notification_time: event.notification_time,
      }))
      //truyền bằng Object để chèn thêm biến khác nếu muốn
      return res.status(200).json({ events })
   })
})

router.delete('/delete/:id', (req, res) => {
   const { id } = req.body
   const sql = 'DELETE FROM event WHERE id = ?'
   db.run(sql, [id], function (err) {
      if (err) {
         return res.status(500).json({ error: 'An error occurred while deleting the event.' })
      }
      return res.status(200).json({ message: 'Event deleted successfully.' })
   })
})

module.exports = router
