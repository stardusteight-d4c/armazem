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
import { checkSession } from '../middlewares/authorization'

const router = express.Router()

router.get('/verifyUsername/:username', verifyUsername)
router.put('/emailConfirmation', emailConfirmation)
router.get('/verifyEmailAddress/:email', verifyEmailAddress)
router.post('/register', register)
router.post('/registerGoogleAccount', registerGoogleAccount)
router.put('/login', login)
router.put('/loginByGoogleProvider', loginByGoogleProvider)
router.put('/middleware/checkSession', checkSession)

export { router }
