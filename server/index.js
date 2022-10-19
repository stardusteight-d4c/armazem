import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { router as userRoutes } from './routes/userRoutes.js'
import nodemailer from 'nodemailer'

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

// // NODEMAILER CONFIGURATION
// async function SendEmailVerification() {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//       user: 'margaretta.wintheiser15@ethereal.email',
//       pass: 'Hb4dgK7vNwnNwZ2Cdy',
//     },
//   })

//   // SEND EMAIL WITH DEFINED TRANSPORT OBJECT
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: 'bar@example.com, baz@example.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     html: '<b>Hello world?</b>', // html body
//   })

//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
// }

// SendEmailVerification().catch(console.error)

// STARTING SERVER
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`)
})
