import express from "express";
import { ENV } from "./src/helpers/env.js";

import cookieParser from "cookie-parser";
import userRoute from "./src/routes/user.route.js";
import courseRoute from "./src/routes/course.route.js";
import { connectDB } from "./src/config/db.js";
import moduleRoute from "./src/routes/module.route.js";
import quizRoute from "./src/routes/quiz.route.js";


const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))



app.use('/api', userRoute)
app.use('/api/course', courseRoute)
app.use('/api/module', moduleRoute)
app.use('/api/quiz', quizRoute)

app.listen(ENV.PORT,()=>{
    connectDB()
    console.log(`server running on port ${ENV.PORT}`)
})