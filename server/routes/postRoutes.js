import express from 'express'
import {
  addNewDiscussion,
  createPostAndAddToUserAccount,
  lastFivePostsOfAccount,
  postMetadataById,
} from '../controllers/postController'

const router = express.Router()

router.post('/createPostAndAddToUserAccount', createPostAndAddToUserAccount)
router.get('/lastFivePostsOfAccount/:id', lastFivePostsOfAccount)
router.get('/postMetadataById/:id', postMetadataById)
router.post('/addNewDiscussion', addNewDiscussion)

export { router }
