
import cloudinary from "../helpers/cloudinary.js";

import { Course } from "../models/course.model.js";
import Order from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { ENV } from "../helpers/env.js";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
export const creatCourse = async (req, res) => {
    try {
        const { title, description, amount } = req.body;
        const thumbnail = req.file;

        if (!title || !description || !thumbnail || !amount) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        let imageUrl = "";

        const base64 = `data:${req.file.mimetype};base64,${thumbnail.buffer.toString("base64")}`;

        const uploadRes = await cloudinary.uploader.upload(base64, {
            folder: "course",
        });

        imageUrl = uploadRes.secure_url;

        // ✅ Add 'new' keyword
        const newCourse = new Course({
            userId: req.user._id,
            title,
            description,
            thumbnail: imageUrl,
            amount
        });

        await newCourse.save();

        return res.status(201).json({
            message: "Course created successfully",
            course: newCourse
        });
    } catch (error) {
        console.error(`Error from create course:`, error);
        return res.status(500).json({
            message: "Failed to create course",
            error: error.message
        });
    }
}


export const getCourse = async (req, res) => {
  try {
    const { search } = req.query;

    // ✅ No search query = Return all courses
    if (!search || search.trim() === "") {
      const allCourses = await Course.find()
      return res.status(200).json({
        success: true,
        courses: allCourses,
        count: allCourses.length
      });
    }

    // ✅ Search query exists = Apply AI + filter
    console.log("Search query:", search);

    const prompt = `You are an intelligent assistant for a Learning Management System. A user is searching for courses. Analyze the query and return the most relevant keyword from these categories:
- Web Development
- Artificial Intelligence
- MERN Stack Development
- Mobile Development
- Data Science
- DevOps

Only reply with ONE keyword that best matches the query. No explanation.

User query: "${search}"`;

    const result = await model.generateContent(prompt);
    const aiText =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text
        ?.trim()
        .replace(/[`"\n]/g, "") || "";

    console.log("Frontend search:", search);
    console.log("AI suggestion:", aiText);

    // ✅ Use AI suggestion OR original search term
    const searchTerm = aiText || search;

    // ✅ Build filter query
     const mongoQuery = {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },         // ✅ title (not courseTitle)
        { description: { $regex: searchTerm, $options: "i" } }    // ✅ description (not courseDescription)
      ]
    };

    // ✅ Execute filtered query
    const courses = await Course.find(mongoQuery).lean();

    console.log(`Found ${courses.length} courses for "${search}"`);

    return res.status(200).json({
      success: true,
      courses,
      count: courses.length,
      searchTerm: search,
      aiSuggestion: aiText
    });

  } catch (error) {
    console.error(`Error from getCourse: ${error}`);
    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};
 
export const getSingleCourse = async(req,res)=>{
    try {
        
        const courseId = req.params.id

        const course = await Course.findById(courseId).populate("userId")

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



export const getPurchasedCourse = async(req,res)=>{
    try {
        const courseId = req.params.id

        if(!courseId){
            return res.status(401).json({
                message:"Course not found"
            })
        }

       const purchasedOrder = await Course.findById(courseId).populate("modules")
        if(!purchasedOrder){
            return res.status(401).json({
                message:"Course not found"
            })
        }

        return res.status(201).json(purchasedOrder)
    } catch (error) {
        console.log(error)
    }
}

export const getAllPurchasedCourse =async(req,res)=>{
    try {
        const userId = req.user.id

        const user = await User.findById(userId).populate("purchasedCourses")
        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }

        // const course = await Order

        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
    }
}