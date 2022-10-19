import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { router as userRoutes } from './routes/userRoutes.js'

// ENVIRONMENT VARIABLES
dotenv.config()

// INSTANTING EXPRESS APP
const app = express()

// CONVERTING REQUEST BODY TO JSON
app.use(express.json())

// SETTING CROSS-ORIGIN RESOURCE SHARING
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
)

app.use('/api/auth', userRoutes)

// CONNECTING WITH DATABASE
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB Successfully Connection')
  })
  .catch((err) => {
    console.log(err.message)
  })

// STARTING SERVER
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`)
})
