import express from "express";
import { ENV } from "./src/helpers/env.js";
import { connectDB } from "./src/helpers/db.js";


const app = express()


app.listen(ENV.PORT,()=>{
    connectDB()
    console.log(`server running on port ${ENV.PORT}`)
})