import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { createModule } from "../controllers/module.controller.js";
import { upload } from "../middleware/upload.js";


const moduleRoute  = express.Router()

moduleRoute.post("createModule", protectRoute, adminRoute,upload.single("video"), createModule)

export default moduleRoute