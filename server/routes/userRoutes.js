import express from 'express'
import {
  emailConfirmation,
  login,
  loginByGoogleProvider,
  register,
  registerGoogleAccount,
  validateSignUp,
  verifyEmailAddress,
} from '../controllers/usersController'
import { checkSession } from '../middleware/authorization'

const router = express.Router()

router.post('/validateSignUp', validateSignUp)
router.post('/emailConfirmation', emailConfirmation)
router.post('/register', register)
router.post('/login', login)
router.post('/registerGoogleAccount', registerGoogleAccount)
router.post('/verifyEmailAddress', verifyEmailAddress)
router.post('/loginByGoogleProvider', loginByGoogleProvider)
router.post('/middleware/checkSession', checkSession)

export { router }
