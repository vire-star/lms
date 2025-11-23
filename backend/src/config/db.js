import mongoose from "mongoose"
import { ENV } from "../helpers/env.js"


export const connectDB = async()=>{
    try {
        await mongoose.connect(ENV.MONG_URI)
        console.log(`database connected`)
    } catch (error) {
        console.log(`error from connectDB, ${error}`)
    }
}