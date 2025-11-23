import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createQuiz, getQuiz } from "../controllers/quiz.controller.js";


const quizRoute = express.Router()


quizRoute.post("/createQuiz", protectRoute, createQuiz)
quizRoute.get("/getSingleModuleQuiz/:id", protectRoute, getQuiz)

export default quizRoute