import mongoose from "mongoose"
const RequestSchema = new mongoose.Schema({
    fromUser: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        avatar: {
            type: Buffer
        }

    },
    toUser: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        avatar: {
            type: Buffer
        }
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,

    },
    message: {
        type: String,
    },
    numberOfNights: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['accepted', 'declined', 'pending', 'fullfilled'],
        default: 'pending'
    }
}, { timestamps: true })

export default mongoose.model('Request', RequestSchema)
