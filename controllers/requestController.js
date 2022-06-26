import Comment from '../models/Comment.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index.js'
import User from '../models/User.js';
import Request from '../models/Request.js';
import { requestEmail, sendCancelRequestEmail } from '../emails/account.js'


const createRequest = async (req, res) => {
    const { fromUser, toUser, fromDate, toDate, message, numberOfNights } = req.query

    const user = await User.findById({ _id: toUser })
    if (!user) { throw new BadRequestError('No user to make request') }
    if (!fromDate || !toDate) { throw new BadRequestError('Please check the DATES') }
    if (numberOfNights < 0) { throw new BadRequestError('TO date cannot be before FROM date') }

    if (fromUser === toUser) { throw new BadRequestError('Self request not allowed') }

    // check if there's already a request with pending status. 
    const requestExists = await Request.findOne({
        "fromUser.id": req.user._id,
        "toUser.id": toUser,
        status: "pending"
    })


    // in case of absence of a request which's in pending status, user cannot make another request to same host
    if (requestExists) { throw new BadRequestError('You have already an incomplete request.') }

    // check if users criterias match.
    if (numberOfNights > user.hosting.maxNights ||
        user?.age < user.hosting.prefAgeStart ||
        user?.age > user.hosting.prefAgeEnd) { throw new BadRequestError("You do not provide some criterias to make a request to this user. Please check user's hosting criterias!") }



    const request = await Request.create({
        'fromUser': {
            id: req.user._id,
            name: req.user.name,
            city: req.user.city,
            country: req.user.country,
            avatar: req.user.avatar,
            age: req.user.age,
            test: 'test'
        },
        'toUser': {
            id: user._id,
            name: user.name,
            city: user.city,
            country: user.country,
            avatar: user.avatar,
            age: user.age,
            test: 'test'
        },
        'fromDate': new Date(fromDate),
        'toDate': new Date(toDate),
        numberOfNights,
        message
    })
    res.status(StatusCodes.OK).json(request)
}


const cancelRequest = async (req, res) => {
    const { requestId } = req.body
    const request = await Request.findById(requestId)

    if (!request ||
        request.fromUser.toString() !== req.user._id.toString() ||
        request.status !== 'pending'
    ) { throw new BadRequestError('No request to cancel') }

    await request.delete()
    res.status(StatusCodes.OK).json({ msg: "Request cancelled" })
}



const respondRequest = async (req, res) => {
    const { id, status } = req.query
    const request = await Request.findById(id)

    if (!request) { throw new BadRequestError('No request to respond') }
    if (request.toUser.id.toString() !== req.user._id.toString()) { throw new BadRequestError('User cannot make request yourself') }
    if (request.status !== 'pending') { throw new BadRequestError('Request is already acccepted/declined') }

    request.status = status
    await request.save()

    res.status(StatusCodes.OK).json({ msg: `Request ${status}` })

}

// type => received or sent
// status => accepted, pending, fullfilled, declined etc.
const getRequests = async (req, res) => {
    const { type, status } = req.query

    // find a better solution
    let requests
    if (type === 'received' && !status) { requests = await Request.find({ "toUser.id": req.user._id }).sort({ updatedAt: -1 }) }
    if (type === 'received' && status) { requests = await Request.find({ "toUser.id": req.user._id, status }).sort({ updatedAt: -1 }) }
    if (type === 'sent' && !status) { requests = await Request.find({ "fromUser.id": req.user._id }).sort({ updatedAt: -1 }) }
    if (type === 'sent' && status) { requests = await Request.find({ "fromUser.id": req.user._id, status }).sort({ updatedAt: -1 }) }

    res.status(StatusCodes.OK).json(requests)
}

export { createRequest, cancelRequest, respondRequest, getRequests }