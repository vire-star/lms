import cloudinary from "../helpers/cloudinary.js";
import { Module } from "../models/modules.model";

export const createModule = async(req ,res)=>{
    try {
        const {courseId}= req.body;

        if(!courseId){
            return res.status(401).json({
                message:"Please provide course Id"
            })
        }

         let VideoUrl = "";
        
            if (req.file) {
              // buffer ko base64 me convert karke Cloudinary ko de dete hain
              const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        
              const uploadRes = await cloudinary.uploader.upload(base64, {
                folder: "courseModule",
              });
        
              VideoUrl = uploadRes.secure_url;
            }
        

            const module = await Module.create({
                courseId,
                 video:VideoUrl
            })

            await module.save()

            return res.status(201).json(module)
    } catch (error) {
        console.log(`error from createModule, ${error}`)
    }
}