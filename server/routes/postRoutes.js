import express from 'express'
import {
  addNewDiscussion,
  addNewReply,
  createPostAndAddToUserAccount,
  discussionsByPostId,
  lastFivePostsOfAccount,
  postMetadataById,
  repliesOfDiscussion,
  updateDiscussion,
  updateReply,
} from '../controllers/postController'

const router = express.Router()

router.post('/createPostAndAddToUserAccount', createPostAndAddToUserAccount)
router.get('/lastFivePostsOfAccount/:id', lastFivePostsOfAccount)
router.get('/postMetadataById/:id', postMetadataById)
router.post('/addNewDiscussion', addNewDiscussion)
router.get('/discussionsByPostId/:postId', discussionsByPostId)
router.post('/addNewReply', addNewReply)
router.get('/repliesOfDiscussion/:discussionId', repliesOfDiscussion)
router.post('/updateDiscussion', updateDiscussion)
router.post('/updateReply', updateReply)



export { router }
