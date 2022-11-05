import express from 'express'
import {
  accountDataByUserId,
  addConnection,
  postByPagination,
  rejectConnection,
  removeConnection,
  searchSharedPostByTitle,
  searchUserPostByTitle,
  sendRequest,
  sharedPostByPagination,
  sharedPosts,
} from '../controllers/accountController'

const router = express.Router()

router.post('/sendRequest', sendRequest)
router.get('/accountDataByUserId/:id', accountDataByUserId)
router.post('/addConnection', addConnection)
router.post('/rejectConnection', rejectConnection)
router.post('/removeConnection', removeConnection)
router.post('/sharedPosts', sharedPosts)
router.get('/postByPagination/:userId/:page', postByPagination)
router.post('/searchUserPostByTitle', searchUserPostByTitle)
router.get('/sharedPostByPagination/:accountId/:page', sharedPostByPagination)
router.post('/searchSharedPostByTitle', searchSharedPostByTitle)

export { router }
