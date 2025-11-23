import mongoose from "mongoose";

const quizSchema  = new mongoose.Schema({
    moduleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Module"
    },
    questions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Question"
        }
    ]
}, {timestamps:true})


export const Quiz = mongoose.model("Quiz", quizSchema)