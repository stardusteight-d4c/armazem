import express from 'express'
import {
  addManga,
  addMangaToListed,
  addReview,
  mangaByGenre,
  mangaByGenreAndTitle,
  mangaByPagination,
  mangaByUid,
  removeMangaToListed,
  reviewsByPagination,
  searchByTitle,
} from '../controllers/mangaController'

const router = express.Router()

router.post('/addManga', addManga)
router.post('/searchByTitle', searchByTitle)
router.get('/mangaByPagination/:page', mangaByPagination)
router.get('/mangaByUid/:uid', mangaByUid)
router.get('/mangaByGenre/:genre', mangaByGenre)
router.get('/mangaByGenreAndTitle/:genre/:title', mangaByGenreAndTitle)
router.post('/addMangaToListed', addMangaToListed)
router.post('/removeMangaToListed', removeMangaToListed)
router.post('/addReview', addReview)
router.get('/reviewsByPagination/:uid/:page', reviewsByPagination)

export { router }