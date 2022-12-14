import express from 'express'
import {
  addManga,
  addMangaToListed,
  addReview,
  mangaByGenre,
  mangaByGenreAndTitle,
  mangaByPagination,
  mangaByUid,
  mostRead,
  randomMangasByGenre,
  removeMangaToListed,
  review,
  reviewsByPagination,
  searchByTitle,
} from '../controllers/mangaController.js'

const router = express.Router()

router.post('/addManga', addManga)
router.get('/searchByTitle/:query', searchByTitle)
router.get('/mangaByPagination/:page', mangaByPagination)
router.get('/mangaByUid/:uid', mangaByUid)
router.get('/mangaByGenre/:genre', mangaByGenre)
router.get('/mangaByGenreAndTitle/:genre/:title', mangaByGenreAndTitle)
router.put('/addMangaToListed', addMangaToListed)
router.delete('/removeMangaToListed', removeMangaToListed)
router.post('/addReview', addReview)
router.get('/reviewsByPagination/:uid/:page', reviewsByPagination)
router.get('/review/:id', review)
router.get('/randomMangasByGenre/:genre', randomMangasByGenre)
router.get('/mostRead', mostRead)

export { router }