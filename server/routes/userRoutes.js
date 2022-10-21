import express from 'express'
import { emailConfirmation, login, register, validateSignUp } from '../controllers/usersController'

const router = express.Router()

router.post('/validateSignUp', validateSignUp)
router.post('/emailConfirmation', emailConfirmation)
router.post('/register', register)
router.post('/login', login)

export { router }