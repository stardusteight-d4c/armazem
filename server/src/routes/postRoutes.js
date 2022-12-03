import express from 'express'
import {
  addNewDiscussion,
  addNewReply,
  createPost,
  deleteDiscussion,
  deletePost,
  deleteReply,
  discussionsByPostId,
  likePost,
  postMetadataById,
  recentPostsWithPagination,
  repliesOfDiscussion,
  sharePost,
  topRatedPost,
  unlikedPost,
  unsharePost,
  updateDiscussion,
  updatePost,
  updateReply,
} from '../controllers/postController.js'

const router = express.Router()

router.post('/createPost', createPost)
router.get('/postMetadataById/:id', postMetadataById)
router.post('/addNewDiscussion', addNewDiscussion)
router.get('/discussionsByPostId/:postId', discussionsByPostId)
router.post('/addNewReply', addNewReply)
router.get('/repliesOfDiscussion/:discussionId', repliesOfDiscussion)
router.put('/updateDiscussion', updateDiscussion)
router.put('/updateReply', updateReply)
router.delete('/deleteDiscussion', deleteDiscussion)
router.delete('/deleteReply', deleteReply)
router.put('/likePost', likePost)
router.put('/unlikedPost', unlikedPost)
router.put('/updatePost', updatePost)
router.delete('/deletePost', deletePost)
router.put('/sharePost', sharePost)
router.put('/unsharePost', unsharePost)
router.get('/topRatedPost', topRatedPost)
router.get('/recentPostsWithPagination/:page', recentPostsWithPagination)

export { router }
