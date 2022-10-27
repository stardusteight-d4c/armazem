import express from 'express'
import { sendRequest } from '../controllers/accountController'

const router = express.Router()

router.post('/sendRequest', sendRequest)

export { router }
