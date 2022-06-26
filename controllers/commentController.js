import Comment from '../models/Comment.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index.js'
import User from '../models/User.js';

// mongo virtuals?
// sort by update time
const getComments = async (req, res) => {
    const { id } = req.query
    const response = await Comment.find({ to: id }).sort({ createdAt: -1 })
    res.status(StatusCodes.OK).json(response)
}

const createComment = async (req, res) => {
    const { commentText, id } = req.query

    const from = req.user.name
    const to = await User.findById(id)

    if (!to) { throw new NotFoundError('User not found') }
    // no self commenting
    if (req.user._id.toString() === to._id.toString()) { throw new BadRequestError('You cannot leave a comment to yourself!') }

    const comment = await Comment.create({ commentText, from, to })
    await comment.save()
    const comments = await Comment.find({ to: id }).sort({ createdAt: -1 })
    res.status(StatusCodes.OK).json(comments)

}

const deleteComment = async (req, res) => {
    const comment = await Comment.findById(req.body.id)
    if (!comment) { throw new BadRequestError() }


    // user can delete comments his/her own or comment's been left for him/her.  
    if (comment.from.toString() !== req.user._id.toString() &&
        comment.to.toString() !== req.user._id.toString()
    ) { throw new BadRequestError('You are not allowed to perform this') }
    await comment.remove()
    res.status(StatusCodes.OK).json(comment)
}

const updateComment = async (req, res) => {
    const { id, commentText } = req.body
    const comment = await Comment.findById(id)
    comment.commentText = commentText
    await comment.save()
    res.send(comment)
}


export { getComments, createComment, deleteComment, updateComment }