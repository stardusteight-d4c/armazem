import express from 'express'
import {
  accountComments,
  accountDataByUserId,
  addComment,
  addConnection,
  addMangaToFavorites,
  deleteComment,
  lastFivePostsOfAccount,
  mangaFavorites,
  mangaListedByAccountId,
  notifications,
  postByPagination,
  rejectConnection,
  removeConnection,
  removeMangaToFavorites,
  searchSharedPostByTitle,
  searchUserPostByTitle,
  sendRequest,
  sharedPostByPagination,
  sharedPosts,
  updateComment,
  updatesMangaList,
} from '../controllers/accountController'

const router = express.Router()

router.post('/sendRequest', sendRequest)
router.get('/accountDataByUserId/:id', accountDataByUserId)
router.post('/addConnection', addConnection)
router.post('/rejectConnection', rejectConnection)
router.post('/removeConnection', removeConnection)
router.post('/sharedPosts', sharedPosts)
router.get('/lastFivePostsOfAccount/:id', lastFivePostsOfAccount)
router.get('/postByPagination/:userId/:page', postByPagination)
router.post('/searchUserPostByTitle', searchUserPostByTitle)
router.get('/sharedPostByPagination/:accountId/:page', sharedPostByPagination)
router.post('/searchSharedPostByTitle', searchSharedPostByTitle)
router.post('/addComment', addComment)
router.post('/updateComment', updateComment)
router.get('/accountComments/:accountId', accountComments)
router.post('/deleteComment', deleteComment)
router.post('/addMangaToFavorites', addMangaToFavorites)
router.post('/removeMangaToFavorites', removeMangaToFavorites)
router.get('/mangaFavorites/:accountId', mangaFavorites)
router.get('/mangaListedByAccountId/:accountId', mangaListedByAccountId)
router.get('/updatesMangaList/:accountId', updatesMangaList)
router.get('/notifications/:accountId', notifications)

export { router }