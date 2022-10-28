import express from 'express'
import { accountDataByUserId, sendRequest } from '../controllers/accountController'

const router = express.Router()

router.post('/sendRequest', sendRequest)
router.get('/accountDataByUserId/:id', accountDataByUserId)

export { router }
