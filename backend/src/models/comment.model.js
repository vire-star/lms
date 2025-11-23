import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true})


export const Comment = mongoose.model("Comment", commentSchema)