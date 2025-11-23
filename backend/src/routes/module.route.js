import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { createModule, getSingleCourseModule } from "../controllers/module.controller.js";
import { videoUplaod } from "../middleware/videoUpload.js";
// import { upload } from "../middleware/upload.js";


const moduleRoute  = express.Router()

moduleRoute.post("/createModule", protectRoute, adminRoute,videoUplaod.single("video"), createModule)
moduleRoute.get("/getSingleCourseModule/:id", protectRoute, getSingleCourseModule)

export default moduleRoute