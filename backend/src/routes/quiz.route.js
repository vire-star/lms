import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createQuiz, getQuiz } from "../controllers/quiz.controller.js";


const quizRouter=express.Router()


quizRouter.post('/createQuiz', protectRoute, createQuiz)
quizRouter.get('/getQuiz/:id', protectRoute, getQuiz)

export default quizRouter