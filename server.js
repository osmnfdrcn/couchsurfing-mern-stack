import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'


// db and authenticate user
import connectDB from './db/connect.js'

// routers
import userRouter from './routes/userRoute.js'
import commentRouter from './routes/commentRouter.js'
import requestRouter from './routes/requestRouter.js'

//middlewares    
import notFoundMiddleware from './middlewares/not-found.js'
import errorHandlerMiddleware from './middlewares/error-handler.js'

app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/users', userRouter)
app.use('/api/v1/comments', commentRouter)
app.use('/api/v1/requests', requestRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000


const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(port, () => console.log(`Server is running on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()