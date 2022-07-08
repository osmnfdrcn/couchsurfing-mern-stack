import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index.js'
import { sendWelcomeEmail } from '../emails/account.js'
import sharp from 'sharp'




const register = async (req, res) => {
    const { name, email, password } = req.body
    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) { throw new BadRequestError('Email already in use') }

    const user = await User.create({ name, email, password })
    const token = await user.generateAuthToken()

    res.status(StatusCodes.OK).json({ user, token })

}


const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) { throw new BadRequestError('Please provide all values') }

    const user = await User.findOne({ email })
    if (!user) { throw new UnAuthenticatedError('Invalid credentials') }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) { throw new UnAuthenticatedError('Invalid credentials') }

    const token = await user.generateAuthToken()

    res.status(StatusCodes.OK).json({ user, token })

}


// sort by criteria
const getUsers = async (req, res) => {
    const { city, minAge, maxAge, nights, limit, skip } = req.query

    let match = {}
    if (city) { match.city = city }
    if (minAge && maxAge) { match.age = { $lte: maxAge, $gte: minAge } }
    if (nights) { match["hosting.maxNights"] = { $gte: nights } }
    // let parts = []
    // let sortTo
    // if (sortBy) {
    //     parts = sortBy.split(':')
    //     sortTo = parts[1] === 'asc' ? +1 : -1

    const allUsers = await User.find(match, {
        email: 0,
        __v: 0,
        avatar: 0
    })
    const users = await User.find(match, {
        email: 0,
        __v: 0,
    }).limit(limit).skip(skip)

    // .sort({ [parts[0]]: sortTo })
    const totalUsers = allUsers.length
    const numOfPages = Math.ceil(totalUsers / limit)

    res.status(StatusCodes.OK).json({ users, totalUsers, numOfPages })
}

const getProfile = async (req, res) => {
    const { id } = req.query
    const user = await User.findById(id)
    if (!user) { throw new BadRequestError('User couldnt find') }
    res.send(user)
}

const me = async (req, res) => {
    const user = await User.findById(req.user._id)
    res.status(StatusCodes.OK).json(user)
}


// only jpg,jpeg,png are allowed to upload.
const updateAvatar = async (req, res) => {
    const buffer = await sharp(req.file.buffer)
        .resize({ width: 500, height: 500 })
        .png({ quality: 60 })
        .toBuffer()
    req.user.avatar = buffer
    req.user.save()
    const user = req.user
    res.status(StatusCodes.OK).json(user?.avatar)
}

const getAvatar = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) { throw new BadRequestError('No User') }
    if (!user.avatar) { throw new BadRequestError('No Avatar') }
    res.set('Content-Type', 'image/png')
    res.status(StatusCodes.OK).send(user.avatar)
}

const update = async (req, res) => {
    const { password } = req.body

    const updates = Object.keys(req.body)
    const allowedUpdates = password
        ? ['password']
        : ['name', 'email', 'age', 'city', 'country', 'hosting', 'rules', 'countriesVisited']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) { throw new BadRequestError('Invalid updates') }

    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    const user = req.user
    const token = req.token
    res.status(StatusCodes.OK).json({ user, token })
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }

}

const logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}


export { getUsers, register, login, getProfile, logout, logoutAll, update, updateAvatar, getAvatar, me }
