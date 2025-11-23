import express from "express";
import { getUser, login, logout, register } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const userRoute = express.Router()


userRoute.post("/register", register)
userRoute.post("/login", login )
userRoute.post("/logout", logout )
userRoute.get("/getUser", protectRoute, getUser )


export default userRoute