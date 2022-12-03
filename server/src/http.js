import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { router as authRoutes } from './routes/authRoutes.js'
import { router as userRoutes } from './routes/userRoutes.js'
import { router as accountRoutes } from './routes/accountRoutes.js'
import { router as postRoutes } from './routes/postRoutes.js'
import { router as mangaRoutes } from './routes/mangaRoutes.js'
import { router as messageRoutes } from './routes/messageRoutes.js'
import { Server } from 'socket.io'
import http from 'http'

// ENVIRONMENT VARIABLES
dotenv.config()

// INSTANTING EXPRESS APP AND HTTP SERVER
const app = express()
const serverHttp = http.createServer(app)

// PAYLOAD LIMIT
app.use(express.json({ limit: '10mb', extended: true }))
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 })
)

// CONVERTING REQUEST BODY TO JSON
app.use(express.json())

// SETTING CROSS-ORIGIN RESOURCE SHARING
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
)

// ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/post', postRoutes)
app.use('/api/manga', mangaRoutes)
app.use('/api/message', messageRoutes)

// CONNECTING WITH DATABASE
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB Successfully Connection')
  })
  .catch((err) => {
    console.log(err.message)
  })

// INSTANTING SOCKET IO SERVER
const io = new Server(serverHttp, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
  },
})

export { serverHttp, io }

