import express from 'express'
import { createPostAndAddToUserAccount } from '../controllers/postController'

const router = express.Router()

router.post('/createPostAndAddToUserAccount', createPostAndAddToUserAccount)

export { router }

