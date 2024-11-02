const express = require('express')
const bodyParse = require('body-parser')
const cors = require('cors')
const userRoutes = require('./routes/users')
const taskRoutes = require('./routes/tasks')
//INIT
const app = express()
const PORT = 3000

//DB
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./todolist.db', (err) => {
   if (err) {
      console.error('> Could not connect to database', err)
   } else {
      console.log('> Connected to SQLite database')
   }
})

db.serialize(() => {
   db.run(`
        CREATE TABLE IF NOT EXISTS task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title VARCHAR(100) NOT NULL,
            completed INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `)

   db.run(
      `
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_name VARCHAR(100) UNIQUE,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `,
   )
})

//MIDDLEWARE
app.use(cors())
app.use(express.json())

//ROUTES

app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

app.listen(PORT, () => {
   console.log(`> Server is running at http://192.168.1.5:${PORT}`)
})
// app.listen(PORT, () => {
//    console.log(`Server đang chạy trên http://localhost:8081:${PORT}`)
// })
