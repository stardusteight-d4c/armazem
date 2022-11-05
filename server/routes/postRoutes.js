import express from 'express'
import {
  addNewDiscussion,
  addNewReply,
  createPostAndAddToUserAccount,
  deleteDiscussion,
  deletePost,
  deleteReply,
  discussionsByPostId,
  lastFivePostsOfAccount,
  likePost,
  postMetadataById,
  repliesOfDiscussion,
  sharePost,
  unlikedPost,
  unsharePost,
  updateDiscussion,
  updatePost,
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
router.post('/deleteDiscussion', deleteDiscussion) // colocar os métodos adequados
router.post('/deleteReply', deleteReply)
router.post('/likePost', likePost)
router.post('/unlikedPost', unlikedPost)
router.post('/updatePost', updatePost)
router.post('/deletePost', deletePost)
router.post('/sharePost', sharePost)
router.post('/unsharePost', unsharePost)

export { router }