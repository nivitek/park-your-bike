# 🚲 Park Your Bike

A full-stack web application that allows users to **book parking slots for bikes/vehicles**, manage their profiles, and enables admins to monitor bookings efficiently.

---

## 🌐 Live Demo

👉 https://park-your-bike.netlify.app/

---

## 📌 Features

### 👤 User Features

* User Registration & Login (Authentication)
* Book a parking slot for a selected date
* View booking details
* Update user profile

### 🛠 Admin Features

* View all user bookings
* Monitor parking slot usage

---

## 🧰 Tech Stack

### Frontend

* React.js
* TypeScript
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Deployment

* Frontend: Netlify
* Backend: (your backend hosting, e.g., Render / Railway / etc.)

---

## 🔐 Authentication

* Secure login/signup system
* Session/token-based authentication (JWT if used)

---

## 📁 Project Structure

```
root/
│
├── nodeserver-backend/        # Node.js + Express server
├── react-ui/       # React frontend
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/nivitek/park-your-bike.git
cd park-your-bike
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
npm start
```

---

### 3️⃣ Setup Frontend

```
cd react-ui
npm install
npm start
```

---

## 🌍 Environment Variables

Create `.env` files:

### Backend

```
PORT=5000
MONGO_ConnString=your_mongodb_connection
JWT_SECRET=your_secret
Base_URL=your_backend_url || https://localhost:9000
```

### Frontend

```
REACT_APP_API_BASE_URL=your_backend_url
```

---

## 🚀 Future Improvements

* Payment integration for booking
* Real-time slot availability
* Email/SMS notifications
* Admin dashboard with analytics

---

## 👨‍💻 Author

Your Name
GitHub: https://github.com/nivitek

---
