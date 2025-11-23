import express from "express";
import { ENV } from "./src/helpers/env.js";

import cookieParser from "cookie-parser";
import userRoute from "./src/routes/user.route.js";
import courseRoute from "./src/routes/course.route.js";
import { connectDB } from "./src/config/db.js";


const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))



app.use('/api', userRoute)
app.use('/api/course', courseRoute)

app.listen(ENV.PORT,()=>{
    connectDB()
    console.log(`server running on port ${ENV.PORT}`)
})