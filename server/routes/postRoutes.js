import express from 'express'
import {
  addNewDiscussion,
  addNewReply,
  createPostAndAddToUserAccount,
  lastFivePostsOfAccount,
  postMetadataById,
} from '../controllers/postController'

const router = express.Router()

router.post('/createPostAndAddToUserAccount', createPostAndAddToUserAccount)
router.get('/lastFivePostsOfAccount/:id', lastFivePostsOfAccount)
router.get('/postMetadataById/:id', postMetadataById)
router.post('/addNewDiscussion', addNewDiscussion)
router.post('/addNewReply', addNewReply)

export { router }
