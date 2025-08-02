# ✅ Full-Stack Task App

A full-featured task management web app built with **React (Vite)**, **Express.js**, **MongoDB**, and **JWT authentication**. Users can register, log in, and manage their tasks with full CRUD capabilities.

---

## 🚀 Features

- 🔐 User authentication using JWT (Login & Register)
- 📋 Create, edit, delete, and update task status (CRUD operations)
- 🧠 React state management with `useState`, `useEffect`
- ⚡ Fast frontend with **React + Vite**
- 📡 Express.js REST API with secured routes
- 🗄️ MongoDB database with Mongoose
- 📦 Modular code structure (frontend + backend separation)

---

## 🛠️ Tech Stack

| Layer        | Tech Stack                      |
|--------------|----------------------------------|
| **Frontend** | React (Vite), Axios, Tailwind CSS |
| **Backend**  | Node.js, Express.js, MongoDB, Mongoose |
| **Auth**     | JWT (JSON Web Token)             |
| **Others**   | dotenv, bcrypt, cors, etc.       |

---

## 📁 Project Structure

```
Full-Stack-TaskApp/
├── client/                 # Vite + React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── services/       # Axios calls
│   │   └── App.jsx
├── server/                 # Express backend
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes (auth, tasks)
│   ├── controllers/        # Route logic
│   ├── middleware/         # JWT auth, error handling
│   └── server.js
```

---

## 📦 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/api/auth/register` | Register new user      |
| POST   | `/api/auth/login`    | Login and get token    |

### 📝 Task Routes (Protected)

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| GET    | `/api/tasks`      | Get all tasks of logged-in user |
| POST   | `/api/tasks`      | Create a new task          |
| PUT    | `/api/tasks/:id`  | Edit/update a task         |
| DELETE | `/api/tasks/:id`  | Delete a task              |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/dhnshshettigar/Full-Stack-TaskApp.git
cd Full-Stack-TaskApp
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173)

---

## 🧪 To-Do Features

- [x] User Registration & Login
- [x] Task creation
- [x] Task editing
- [x] Task deletion
- [x] JWT-based protected routes

---

## 📬 Contact

Made by [Dhanush Shettigar](https://github.com/dhnshshettigar)  
If you like it, ⭐ the repo!
