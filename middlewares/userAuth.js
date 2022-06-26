import jwt from 'jsonwebtoken'
import { UnAuthenticatedError, BadRequestError } from "../errors/index.js"
import User from '../models/User.js'

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new UnAuthenticatedError('Invalid credentials')
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        throw new UnAuthenticatedError('Authentication invalid')
    }
}

export default auth