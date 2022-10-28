import express from 'express'
import {
  accountDataByUserId,
  addConnection,
  rejectConnection,
  sendRequest,
} from '../controllers/accountController'

const router = express.Router()

router.post('/sendRequest', sendRequest)
router.get('/accountDataByUserId/:id', accountDataByUserId)
router.post('/addConnection', addConnection)
router.post('/rejectConnection', rejectConnection)

export { router }
