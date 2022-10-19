import express from 'express'
import { emailConfirmation } from '../controllers/usersController'

const router = express.Router()

router.post('/emailConfirmation', emailConfirmation)

export { router }