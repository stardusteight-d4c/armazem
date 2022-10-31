import express from 'express'
import {
  addNewDiscussion,
  addNewReply,
  createPostAndAddToUserAccount,
  lastFivePostsOfAccount,
  postMetadataById,
  repliesOfDiscussion,
} from '../controllers/postController'

const router = express.Router()

router.post('/createPostAndAddToUserAccount', createPostAndAddToUserAccount)
router.get('/lastFivePostsOfAccount/:id', lastFivePostsOfAccount)
router.get('/postMetadataById/:id', postMetadataById)
router.post('/addNewDiscussion', addNewDiscussion)
router.post('/addNewReply', addNewReply)
router.get('/repliesOfDiscussion/:discussionId', repliesOfDiscussion)

export { router }
