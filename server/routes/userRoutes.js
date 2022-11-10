import express from 'express'
import {
  searchUsersByQuery,
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

export { router }
