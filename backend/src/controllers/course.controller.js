import cloudinary from "../helpers/cloudinary.js";
import { redis } from "../helpers/redis.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";


export const creatCourse = async(req ,res)=>{
    try {
        const {title, description}=req.body;

        if(!title || !description){
            return res.status(401).json({
                message:"All fields are required"
            })
        }

         let imageUrl = "";

    if (req.file) {
      // buffer ko base64 me convert karke Cloudinary ko de dete hain
      const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      const uploadRes = await cloudinary.uploader.upload(base64, {
        folder: "course",
      });

      imageUrl = uploadRes.secure_url;
    }

    const newCourse = await Course({
        userId: req.user._id,
        title,
        description,
        thumbnail:imageUrl
    })

    await newCourse.save();

    return res.status(201).json({
        message:"Course created successfully",
        newCourse
    })
    } catch (error) {
        console.log(`error from create course `,error)
    }
}



export const getCourse = async (req, res) => {
  try {
    let allcourse = await redis.get("allCourse");

     

    if (allcourse) {
      // Agar Upstash ne already object return kiya (auto-deserialize), to parse ki zarurat nahi
      if (typeof allcourse === "object") {
        return res.status(200).json({ fromCache: true, allcourse: allcourse });
      }

      // Agar string hai, tabhi JSON.parse karo
      if (typeof allcourse === "string") {
        const allcourse = JSON.parse(allcourse);
        return res.status(200).json({ fromCache: true, allcourse });
      }
    }

    const courses = await Course.find({}).lean();

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No allcourse found" });
    }

    // 3) Redis me seedha object store karo (Upstash khud stringify karega)
 

    return res.status(200).json(courses);
  } catch (error) {
    console.error(`error from getCourse, ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getSingleCourse = async(req,res)=>{
    try {
        
        const courseId = req.params.id

        const course = await Course.findById(courseId)

        if(!course){
            return res.status(401).json({
                message:"Course not found"
            })
        }

        return res.status(201).json({
            course
        })

    } catch (error) {
        console.log(`error from getSingleCourse, ${error}`)
    }
}