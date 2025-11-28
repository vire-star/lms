import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz",
        required:true
    },

    content:{
        type:String,
        required:true 
    },

    options:[
        {
            type:String,
            // required:true
        }
    ],

    correctOption:{
        type:String,
        // required:true
    },


    explanation:{
        type:String,
        // required:true
    }


},{timestamps:true})


export const Question = mongoose.model("Question", questionSchema)