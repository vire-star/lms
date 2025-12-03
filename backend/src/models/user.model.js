import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    },
    profilePhoto:{
        type:String
        
    },
     purchasedCourses: [{ // ✅ Array with 's' - multiple courses
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course" // ✅ Direct course reference (better approach)
    }]



},{timestamps:true})




userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
}; 

export const User = mongoose.model("User", userSchema)