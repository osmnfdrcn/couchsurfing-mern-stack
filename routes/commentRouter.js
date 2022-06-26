import express from 'express'
const router = express.Router()

import { getComments, createComment, updateComment, deleteComment } from '../controllers/commentController.js'
import authenticateUser from '../middlewares/userAuth.js'

router.route('/').get(authenticateUser, getComments)
router.route('/').post(authenticateUser, createComment)
router.route('/').patch(authenticateUser, updateComment)
router.route('/').delete(authenticateUser, deleteComment)

export default router