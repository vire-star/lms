import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkUserQuiz, generateMyQuiz, getMyQuiz } from "../controllers/quiz.controller.js";
// import { createQuiz, getQuiz } from "../controllers/quiz.controller.js";


const quizRouter=express.Router()


quizRouter.post('/generateQuiz',protectRoute, generateMyQuiz )
quizRouter.get('/getMyQuiz/:id',protectRoute, getMyQuiz )
quizRouter.get('/checkUserQuiz/:id',protectRoute, checkUserQuiz )

// 692da6c0f086820601ca0978
// quizRouter.post('/createQuiz', protectRoute, createQuiz)
// quizRouter.get('/getQuiz/:id', protectRoute, getQuiz)

export default quizRouter
