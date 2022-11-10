import { serverHttp } from "./http"
import './websocket'

// import express from 'express'
// import cors from 'cors'
// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import { router as authRoutes } from './routes/authRoutes.js'
// import { router as userRoutes } from './routes/userRoutes.js'
// import { router as accountRoutes } from './routes/accountRoutes.js'
// import { router as postRoutes } from './routes/postRoutes.js'
// import { Server } from 'socket.io'
// import './websocket'


// // ENVIRONMENT VARIABLES
// dotenv.config()

// // INSTANTING EXPRESS APP AND HTTP SERVER
// const app = express()
// // const serverHttp = http.createServer()

// // PAYLOAD LIMIT
// app.use(express.json({ limit: '10mb', extended: true }))
// app.use(
//   express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 })
// )

// // CONVERTING REQUEST BODY TO JSON
// app.use(express.json())

// // SETTING CROSS-ORIGIN RESOURCE SHARING
// app.use(
//   cors({
//     origin: process.env.ORIGIN,
//   })
// )

// // ROUTES
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
// app.use('/api/account', accountRoutes)
// app.use('/api/post', postRoutes)

// // CONNECTING WITH DATABASE
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log('DB Successfully Connection')
//   })
//   .catch((err) => {
//     console.log(err.message)
//   })

// // STARTING EXPRESS SERVER
// const server = app.listen(process.env.PORT, () => {
//   console.log(`Server listening on PORT: ${process.env.PORT}`)
// })


// STARTING SERVER
serverHttp.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`)
})


