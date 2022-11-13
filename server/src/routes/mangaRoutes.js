import express from 'express'
import { addManga } from '../controllers/mangaController'


const router = express.Router()

router.post('/addManga', addManga)

export { router }
