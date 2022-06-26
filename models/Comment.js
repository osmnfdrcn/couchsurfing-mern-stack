import mongoose from "mongoose"
const CommentSchema = new mongoose.Schema({
    commentText: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
}, {
    timestamps: true
})


export default mongoose.model('Comment', CommentSchema)
