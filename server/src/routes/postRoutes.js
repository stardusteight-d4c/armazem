import express from 'express'
import {
  addNewDiscussion,
  addNewReply,
  createPostAndAddToUserAccount,
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
} from '../controllers/postController'

const router = express.Router()

router.post('/createPostAndAddToUserAccount', createPostAndAddToUserAccount)
router.get('/postMetadataById/:id', postMetadataById)
router.post('/addNewDiscussion', addNewDiscussion)
router.get('/discussionsByPostId/:postId', discussionsByPostId)
router.post('/addNewReply', addNewReply)
router.get('/repliesOfDiscussion/:discussionId', repliesOfDiscussion)
router.post('/updateDiscussion', updateDiscussion)
router.post('/updateReply', updateReply)
router.post('/deleteDiscussion', deleteDiscussion)
router.post('/deleteReply', deleteReply)
router.put('/likePost', likePost)
router.put('/unlikedPost', unlikedPost)
router.post('/updatePost', updatePost)
router.post('/deletePost', deletePost)
router.put('/sharePost', sharePost)
router.put('/unsharePost', unsharePost)
router.get('/topRatedPost', topRatedPost)
router.get('/recentPostsWithPagination/:page', recentPostsWithPagination)

export { router }
