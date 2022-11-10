import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import { router as authRoutes } from './routes/authRoutes.js'
import { router as userRoutes } from './routes/userRoutes.js'
import { router as accountRoutes } from './routes/accountRoutes.js'
import { router as postRoutes } from './routes/postRoutes.js'

// ENVIRONMENT VARIABLES
dotenv.config()

// INSTANTING EXPRESS APP
const app = express()

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
export const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`)
})

// // STARTING WEB SOCKET SERVER
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//     transports: ['websocket', 'polling'],
//     credentials: true,
//   },
// })

// // CONNECT WS
// const onlineUsers = {}
// io.on('connection', (socket) => {
//   global.chatSocket = socket
//   socket.on('logged-in', (data) => {
//     onlineUsers[data.userId] = data.username
//   })

//   socket.on('logged-out', (userId) => {
//     delete onlineUsers[userId]
//   })

//   console.log(onlineUsers)

//   // socket.on('send-msg', (data) => {
//   //   const sendUserSocket = onlineUsers.get(data.to)
//   //   if (sendUserSocket) {
//   //     socket.to(sendUserSocket).emit('msg-received', data.message)
//   //   }
//   // })
// })
