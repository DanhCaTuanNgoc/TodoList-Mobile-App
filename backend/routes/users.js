const { default: AsyncStorage } = require('@react-native-async-storage/async-storage')
const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./todolist.db')

// REGISTER
router.post('/register', (req, res) => {
   const { user_name, email, password } = req.body
   if (!user_name || !email || !password) {
      return res
         .status(400)
         .json({ error: 'Please provide user_name, email, and password.' })
   }
   const sql = `INSERT INTO user (user_name, email, password) VALUES (?, ?, ?)`
   db.run(sql, [user_name, email, password], function (err) {
      if (err) {
         console.error(err.message)
         return res
            .status(500)
            .json({ error: 'An error occurred while adding the user.' })
      }
      res.status(201).json({ id: this.lastID, user_name, email })
   })
})

//LOGIN
router.post('/login', (req, res) => {
   const { email, password } = req.body
   db.all(
      'SELECT * FROM user WHERE email = ? AND password = ? LIMIT 1',
      [email, password],
      (err, rows) => {
         if (err) {
            return res.status(400).json({ erorr: 'User not found' })
         }
         if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' })
         }
         res.status(201).json(rows[0])
      },
   )
})

module.exports = router
