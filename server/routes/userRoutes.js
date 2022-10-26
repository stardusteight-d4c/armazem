import express from 'express'
import {
  currentUserData,
  updateCoverImage,
  userByUsername,
} from '../controllers/userController'

const router = express.Router()

router.get('/:id', currentUserData)
router.get('/username/:username', userByUsername)
router.post('/updateCoverImage', updateCoverImage)

export { router }
