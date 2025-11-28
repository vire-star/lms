import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createQuestion, getQuestion } from "../controllers/question.controller.js";


const questionRoute = express.Router()

questionRoute.get('/getQuestion', protectRoute, getQuestion)
questionRoute.post('/createQuestion', protectRoute, createQuestion)

export default questionRoute