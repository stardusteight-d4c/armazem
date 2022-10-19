import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
)

app.use(express.json())

if (process.env.MONGO_URL) {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log('DB Successfully Connection')
    })
    .catch((err) => {
      console.log(err.message)
    })
}

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`)
})
