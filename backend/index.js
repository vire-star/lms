import express from "express";
import { ENV } from "./src/helpers/env.js";

import cookieParser from "cookie-parser";
import userRoute from "./src/routes/user.route.js";
import courseRoute from "./src/routes/course.route.js";
import { connectDB } from "./src/config/db.js";
import moduleRoute from "./src/routes/module.route.js";
import quizRouter from "./src/routes/quiz.route.js";
import questionRoute from "./src/routes/question.route.js";
import cors from 'cors'
import paymentRoute from "./src/routes/payment.route.js";
import commentRoute from "./src/routes/comment.route.js";
import analyticRoute from "./src/routes/analytic.route.js";

const app = express()

app.use(cors({
    origin:ENV.CLIENT_URL,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))



app.use('/api', userRoute)
app.use('/api/course', courseRoute)
app.use('/api/module', moduleRoute)
app.use('/api/quiz', quizRouter)
app.use('/api/question', questionRoute)
app.use('/api/payment', paymentRoute)
app.use('/api/comment', commentRoute)
app.use('/api/analytic', analyticRoute)


app.listen(ENV.PORT,()=>{
    connectDB()
    console.log(`server running on port ${ENV.PORT}`)
})