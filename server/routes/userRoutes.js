import express from 'express'
import {
  searchUsersByQuery,
  updateCoverImage,
  updateProfileImage,
  userById,
  userByUsername,
} from '../controllers/userController'

const router = express.Router()

router.get('/:id', userById)
router.get('/username/:username', userByUsername)
router.post('/updateCoverImage', updateCoverImage)
router.post('/updateProfileImage', updateProfileImage)
router.post('/searchUsersByQuery', searchUsersByQuery)

export { router }
