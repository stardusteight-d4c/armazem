import express from 'express'
import {
  currentUserData,
  updateCoverImage,
  updateProfileImage,
  userByUsername,
} from '../controllers/userController'

const router = express.Router()

router.get('/:id', currentUserData)
router.get('/username/:username', userByUsername)
router.post('/updateCoverImage', updateCoverImage)
router.post('/updateProfileImage', updateProfileImage)

export { router }
