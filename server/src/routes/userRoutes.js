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
router.put('/updateCoverImage', updateCoverImage)
router.put('/updateProfileImage', updateProfileImage)
router.get('/searchUsersByQuery/:query', searchUsersByQuery)
router.put('/middleware/activeUser/:userId', activeUser)
router.put('/changeUserPassword', changeUserPassword)
router.put('/changeUserEmail', changeUserEmail)
router.post(
  '/sendTokenChangeEmailVerification',
  sendTokenChangeEmailVerification
)
router.put('/changeUserUsername', changeUserUsername)

export { router }
