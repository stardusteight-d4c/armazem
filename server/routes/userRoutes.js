import express from 'express'
import { currentUserData, userByUsername } from '../controllers/userController'

const router = express.Router()

router.get('/:id', currentUserData)
router.get('/username/:username', userByUsername)

export { router }
