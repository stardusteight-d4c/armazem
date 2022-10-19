import express from 'express'
import { register } from '../controllers/usersController.js'

const router = express.Router()

router.post('/register', register)

export { router }