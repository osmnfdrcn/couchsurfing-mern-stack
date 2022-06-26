import express from 'express'
const router = express.Router()

import { getUsers, register, login, getProfile, logout, logoutAll, update, updateAvatar, getAvatar, me } from '../controllers/userController.js'
import { uploadAvatar } from '../middlewares/uploadAvatar.js'
import authenticateUser from '../middlewares/userAuth.js'


router.route('/').get(authenticateUser, getUsers)
router.route('/me').get(authenticateUser, me)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/profile').get(authenticateUser, getProfile)
router.route('/logout').post(authenticateUser, logout)
router.route('/logoutAll').post(authenticateUser, logoutAll)
router.route('/updateProfile').patch(authenticateUser, update)
router.route('/avatar').post(authenticateUser, uploadAvatar.single('avatar'), updateAvatar)
router.route('/:id/avatar').get(getAvatar)

export default router