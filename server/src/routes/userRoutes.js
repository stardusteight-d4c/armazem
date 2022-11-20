import express from 'express'
import {
  changeUserEmail,
  changeUserPassword,
  changeUserUsername,
  searchUsersByQuery,
  sendTokenChangeEmailVerification,
  updateCoverImage,
  updateProfileImage,
  userById,
  userByUsername,
} from '../controllers/userController'
import { activeUser } from '../middlewares/active-user'

const router = express.Router()

router.get('/:id', userById)
router.get('/username/:username', userByUsername)
router.post('/updateCoverImage', updateCoverImage)
router.post('/updateProfileImage', updateProfileImage)
router.post('/searchUsersByQuery', searchUsersByQuery)
router.post('/middleware/activeUser/:userId', activeUser)
router.post('/changeUserPassword', changeUserPassword)
router.post('/changeUserEmail', changeUserEmail)
router.post('/sendTokenChangeEmailVerification', sendTokenChangeEmailVerification)
router.post('/changeUserUsername', changeUserUsername)

export { router }