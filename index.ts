import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { connectMongoDB } from './database/database'
import routes from './routes'
require('dotenv').config()

const app = express()
connectMongoDB()

const corsOptions = {
  origin: 'https://lession-exam.vercel.app', 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// logging
app.use(morgan('combined'))


// Define a basic route
app.use('/api/auth', routes.authRoutes)
app.use('/api/user', routes.userRoutes)
app.use('/api/exam', routes.examRoutes)
app.use('/api/question', routes.questionRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to exam server!')
})

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})
