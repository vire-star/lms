import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    video:{
        require:true,
        type:String
    },
    quizzes:[
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz"
         }
    ]
}, {timestamps:true})


export const Module = mongoose.model("Module", moduleSchema)