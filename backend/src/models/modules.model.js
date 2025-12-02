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
    title:{
        type:String,
        required:true
    },

    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz"
    },


    comments:[
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
         }

    ],

    
}, {timestamps:true})


export const Module = mongoose.model("Module", moduleSchema)