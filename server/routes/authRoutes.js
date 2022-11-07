import express from 'express'
import {
  verifyUsername,
  emailConfirmation,
  login,
  loginByGoogleProvider,
  register,
  registerGoogleAccount,
  verifyEmailAddress,
} from '../controllers/authController'
import { checkSession } from '../middleware/authorization'

const router = express.Router()

router.post('/verifyUsername', verifyUsername)
router.post('/emailConfirmation', emailConfirmation)
router.post('/register', register)
router.post('/login', login)
router.post('/registerGoogleAccount', registerGoogleAccount)
router.post('/verifyEmailAddress', verifyEmailAddress)
router.post('/loginByGoogleProvider', loginByGoogleProvider)
router.post('/middleware/checkSession', checkSession)

export { router }
