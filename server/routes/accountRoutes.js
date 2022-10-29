import express from 'express'
import {
  accountDataByUserId,
  addConnection,
  rejectConnection,
  removeConnection,
  sendRequest,
  // userConnections,
} from '../controllers/accountController'

const router = express.Router()

router.post('/sendRequest', sendRequest)
router.get('/accountDataByUserId/:id', accountDataByUserId)
router.post('/addConnection', addConnection)
router.post('/rejectConnection', rejectConnection)
router.post('/removeConnection', removeConnection)
// router.get('/userConnections/:id', userConnections)

export { router }
