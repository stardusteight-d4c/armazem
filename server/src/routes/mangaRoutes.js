import express from 'express'
import { addManga, mangaByPagination, mangaByUid, searchByTitle } from '../controllers/mangaController'


const router = express.Router()

router.post('/addManga', addManga)
router.post('/searchByTitle', searchByTitle)
router.get('/mangaByPagination/:page', mangaByPagination)
router.get('/mangaByUid/:uid', mangaByUid)

export { router }
