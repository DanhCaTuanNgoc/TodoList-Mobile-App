# 📱 TodoList Mobile App

A modern and feature-rich task management mobile application built with React Native and Expo, allowing users to manage their daily tasks and schedule events efficiently.

## 🚀 Technology Stack

### Frontend

-  **Framework:** React Native
-  **Development Platform:** Expo
-  **State Management:** Redux Toolkit
-  **Navigation:** React Navigation v6
-  **Local Storage:** AsyncStorage
-  **UI Components:** React Native Paper
-  **Icons:** Expo Vector Icons

### Backend

-  **Server:** Express.js
-  **Database:** SQLite3
-  **API:** RESTful API

## ✨ Key Features

### Task Management

-  ✅ Create, read, update and delete tasks
-  🔄 Mark tasks as complete/incomplete
-  🗂️ Filter tasks by completion status

### Event Calendar

-  📅 Calendar integration
-  ⏰ Event scheduling with notifications
-  🗑️ Event management (add/delete)
-  🕒 Time-based event organization

### User Management

-  👤 User authentication (Register/Login)
-  👻 Guest mode support
-  🔄 Data synchronization between guest and user accounts when user sign up
-  🌙 Dark/Light theme support

## 🛠️ Installation & Setup

1. Clone the repository

   ```bash
   git clone [https://github.com/DanhCaTuanNgoc/TodoList-Mobile-App.git]
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the backend server

   ```bash
   cd backend
   node server.js
   ```

4. Start the Expo development server
   ```bash
   npx expo start
   ```

## 📱 Project Structure

```
project/
├── app/                  # Main application screens
│   ├── Home.jsx         # Task management screen
│   ├── CalendarScreen.jsx # Event calendar screen
│   ├── Login.jsx        # User authentication
│   └── Register.jsx     # User registration
├── components/          # Reusable components
├── constants/          # Theme and configuration
├── store/             # Redux store setup
│   ├── tasks/         # Task-related actions & reducers
│   ├── events/        # Event-related actions & reducers
│   └── user/          # User authentication state
└── backend/           # Express.js server
    └── routes/        # API endpoints
```

## 🔐 Database Schema

### Users Table

-  id (PRIMARY KEY)
-  user_name
-  email
-  password
-  created_at

### Tasks Table

-  id (PRIMARY KEY)
-  user_id (FOREIGN KEY)
-  title
-  completed
-  created_at

### Events Table

-  id (PRIMARY KEY)
-  user_id (FOREIGN KEY)
-  title
-  date_at
-  time_at
-  notification_time_advance

## 👨‍💻 Development Features

-  Clean and modular code architecture
-  Redux for state management
-  Theme customization support
-  Secure user authentication
-  Efficient data synchronization
-  Responsive UI design

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

-  Email: [ngoctuan090904@gmail.com]
-  LinkedIn: [...]
-  Portfolio: [...]
