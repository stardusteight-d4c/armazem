import express from 'express'
import {
  addMessage, allMessages, lastMessage,
} from '../controllers/messageController'

const router = express.Router()

router.post('/addMessage', addMessage)
router.get('/allMessages', allMessages)
router.get('/lastMessage', lastMessage)

export { router }