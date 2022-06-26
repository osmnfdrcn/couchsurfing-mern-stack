import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import Comment from "./Comment.js"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: [3, 'Name should be longer than 3 characters'],
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        required: [true, ' Please provide a password'],
        minlength: [6, 'Password should be at least 6 characters']
    },
    avatar: {
        type: Buffer
    },
    age: {
        type: Number,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
        lowercase: true
    },
    countriesVisited: {
        type: Array
    },
    hosting: {
        prefAgeStart: {
            type: Number,
            default: 18
        },
        prefAgeEnd: {
            type: Number,
            default: 99,
        },
        maxNights: {
            type: Number,
            default: 3
        },
    },

    rules: {
        type: Array
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

}, { timestamps: true })


// password'u kullaniciya dondurmemek icin email alanina select: false yapilip controller da sadece gonderilecek route larda select('+password') de denebilir
UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.createdAt
    delete userObject.updatedAt
    return userObject
}

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}


export default mongoose.model('User', UserSchema)