import express from "express";
import { getUser, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.js";


const userRoute = express.Router()


userRoute.post("/register", register)
userRoute.post("/login", login )
userRoute.post("/logout", logout )
userRoute.get("/getUser", protectRoute, getUser )
userRoute.put("/updateUser", protectRoute,upload.single("profilePhoto"), updateProfile )



export default userRoute