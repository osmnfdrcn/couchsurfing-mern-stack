import express from 'express'
const router = express.Router()

import { getRequests, createRequest, cancelRequest, respondRequest } from '../controllers/requestController.js'
import authenticateUser from '../middlewares/userAuth.js'

router.route('/').get(authenticateUser, getRequests)
router.route('/').post(authenticateUser, createRequest)
router.route('/').delete(authenticateUser, cancelRequest)
router.route('/respond').post(authenticateUser, respondRequest)

export default router