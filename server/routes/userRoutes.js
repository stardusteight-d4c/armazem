import express from 'express'
import { emailConfirmation, register, validateSignUp } from '../controllers/usersController'

const router = express.Router()

router.post('/validateSignUp', validateSignUp)
router.post('/emailConfirmation', emailConfirmation)
router.post('/register', register)

export { router }