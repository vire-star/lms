
import { Course } from "../models/course.model.js";
import { Module } from "../models/modules.model.js";



export const createModule = async (req, res) => {
  try {
    const { courseId ,  title} = req.body;

    if (!courseId || !title) {
      return res.status(400).json({
        message: "Please provide all the details",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Video file is required",
      });
    }

    // multer-storage-cloudinary ne yaha tak upload complete kar diya hoga
    const videoUrl = req.file.path;       // Cloudinary secure URL
    const publicId = req.file.filename;   // future delete ke liye useful

    const module = await Module.create({
      courseId,
      title,
      video: videoUrl,
      videoPublicId: publicId,            // optional field in schema
    });

    module.save()
      await Course.findByIdAndUpdate(courseId, {
      $push: { modules: module._id },
    });

    return res.status(201).json(module);
  } catch (error) {
    console.log(`error from createModule, `, error);
    return res.status(500).json({
      message: "Server error during module creation",
    });
  }
};


export const getSingleCourseModule = async(req,res)=>{
   try {
     const moduleId = req.params.id;
    if(!moduleId){
        return res.status(401).json({
            message:"Course not found"
        })
    }

    const singleModule = await Module.findById(moduleId)

    if(!singleModule){
        return res.status(401).json({
            message:"No module find"
        })
    }

    return res.status(201).json(singleModule)
   } catch (error) {
    console.log(`error from get single course module ,${error}`)
   }
}