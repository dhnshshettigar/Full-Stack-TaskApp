const express = require('express')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/taskRoutes')
const mongoose = require('mongoose')
const cors = require('cors')

dotenv.config()
const app = express()
app.use(express.json())

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

// Routes
app.use('/api', authRoutes)
app.use('/api/tasks', taskRoutes)


// Connect to DB and start server
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('✅ Connected to MongoDB')
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server running on port ${process.env.PORT}`)
    })
})
.catch((err)=> {
    console.log("MongoDb connection failed:", err.message);
})

