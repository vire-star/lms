import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
   title:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   
   modules:[
    {
        moduleId:mongoose.Schema.Types.ObjectId,
        ref:"Module"
    }
   ]
}, {timestamps:true})

export const Course = mongoose.model("Course", courseSchema)