import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { creatCourse, getAllPurchasedCourse, getCourse, getPurchasedCourse, getSingleCourse } from "../controllers/course.controller.js";
import { upload } from "../middleware/upload.js";

const courseRoute = express.Router()


courseRoute.post("/createCourse", protectRoute, adminRoute,upload.single("thumbnail"), creatCourse)
courseRoute.get('/getAllCourse', protectRoute, getCourse)
courseRoute.get('/getSingleCourse/:id', protectRoute, getSingleCourse)
courseRoute.get('/purchasedCourse/:id', protectRoute, getPurchasedCourse)
courseRoute.get('/getAllCoursePurchased', protectRoute, getAllPurchasedCourse)

export default courseRoute