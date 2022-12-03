import express from 'express'
import {
  accountComments,
  accountDataByUserId,
  addComment,
  addConnection,
  addMangaToFavorites,
  deleteAccount,
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
router.delete('/rejectConnection/:to/:from', rejectConnection)
router.delete('/removeConnection', removeConnection)
router.get('/sharedPosts/:accountId', sharedPosts)
router.get('/lastFivePostsOfAccount/:id', lastFivePostsOfAccount)
router.get('/postByPagination/:userId/:page', postByPagination)
router.get('/searchUserPostByTitle', searchUserPostByTitle)
router.get('/sharedPostByPagination/:accountId/:page', sharedPostByPagination)
router.get('/searchSharedPostByTitle', searchSharedPostByTitle)
router.post('/addComment', addComment)
router.put('/updateComment', updateComment)
router.get('/accountComments/:accountId', accountComments)
router.delete('/deleteComment', deleteComment)
router.post('/addMangaToFavorites', addMangaToFavorites)
router.delete('/removeMangaToFavorites', removeMangaToFavorites)
router.get('/mangaFavorites/:accountId', mangaFavorites)
router.get('/mangaListedByAccountId/:accountId', mangaListedByAccountId)
router.get('/updatesMangaList/:accountId', updatesMangaList)
router.get('/notifications/:accountId', notifications)
router.delete('/deleteAccount', deleteAccount)

export { router }
