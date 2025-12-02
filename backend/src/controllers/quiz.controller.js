import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "../helpers/env.js";
import { Module } from "../models/modules.model.js";
import { Quiz } from "../models/quiz.model.js";
import { Question } from "../models/question.model.js";

// // controllers/quiz.controller.js
// export const createQuiz = async (req, res) => {
//   try {
//     const { moduleId } = req.body;

//     if (!moduleId) {
//       return res.status(400).json({
//         message: "moduleId is required"
//       });
//     }

//     // ✅ Check if user already has a quiz for this module
//     const existingQuiz = await Quiz.findOne({
//       moduleId,
//       userId: req.user._id  // ✅ User-specific check
//     });

//     if (existingQuiz) {
//       return res.status(400).json({
//         success: false,
//         message: "You already have a quiz for this module",
//         quizId: existingQuiz._id
//       });
//     }

//     // ✅ Create user-specific quiz
//     const newQuiz = await Quiz.create({
//       moduleId,
//       userId: req.user._id  // ✅ Attach user
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Quiz created successfully",
//       quiz: newQuiz
//     });
//   } catch (error) {
//     console.error("Error from createQuiz:", error);
//     return res.status(500).json({
//       message: "Internal Server Error"
//     });
//   }
// };

// // kjl
// export const getQuiz = async (req, res) => {
//   try {
//     const moduleId = req.params.id;

//     if (!moduleId) {
//       return res.status(404).json({
//         message: "Module not found",
//       });
//     }

//     const allQuiz = await Quiz.find({ moduleId});

//     if (!allQuiz ) {
//       return res.status(404).json({
//         message: "No quizzes found for this module",
//       });
//     }

//     return res.status(200).json({ allQuiz });
//   } catch (error) {
//     console.log(`error from get quiz, ${error}`);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// controllers/quiz.controller.js

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// ✅ Check if user already has quiz for this module
export const checkUserQuiz = async (req, res) => {
  try {
    const moduleId  = req.params.id;

    const quiz = await Quiz.findOne({
      userId: req.user._id,
      moduleId
    });

    return res.status(200).json({
      success: true,
      hasQuiz: !!quiz,
      quiz: quiz || null
    });
  } catch (error) {
    console.error("Error checking quiz:", error);
    return res.status(500).json({ message: "Internal Server Error" , error: error.message});
  }
};


// ✅ Generate quiz + questions for student
export const generateMyQuiz = async (req, res) => {
  try {
    const { moduleId, content } = req.body;

    if (!moduleId || !content) {
      return res.status(400).json({
        message: "moduleId and content are required"
      });
    }

    // ✅ Check if already generated
    const existingQuiz = await Quiz.findOne({
      userId: req.user._id,
      moduleId
    });

    if (existingQuiz && existingQuiz.questions.length > 0) {
      return res.status(201).json({
        success: false,
        message: "You already have a quiz for this module",
        quizId: existingQuiz._id
      });
    }

    // ✅ Create user's quiz
    const newQuiz = await Quiz.create({
      userId: req.user._id,
      moduleId
    });

    // ✅ Generate questions using AI
    const prompt = `
      Generate 10 technical interview questions for ${content}.
      Each question should be multiple choice with 4 options.
      Return the response in this JSON format only, no additional text:
      {
        "questions": [
          {
            "question": "string",
            "options": ["string", "string", "string", "string"],
            "correctOption": "string",
            "explanation": "string"
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
   const cleanedText = text
  .replace(/```json/gi, "")
  .replace(/```/g, "")
  .trim();
    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (e) {
      console.error("Failed to parse Gemini JSON:", cleanedText);
      await Quiz.findByIdAndDelete(newQuiz._id); // Cleanup
      return res.status(500).json({ message: "AI response parsing failed" });
    }

    const generatedQuestions = parsed.questions || [];
    if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      await Quiz.findByIdAndDelete(newQuiz._id);
      return res.status(500).json({ message: "No questions generated" });
    }

    const createdQuestions = [];

    for (const q of generatedQuestions) {
      const doc = await Question.create({
        quizId: newQuiz._id,
        content: q.question,
        options: q.options,
        correctOption: q.correctOption,
        explanation: q.explanation,
      });
      createdQuestions.push(doc);
    }

    const ids = createdQuestions.map((q) => q._id);

    await Quiz.findByIdAndUpdate(
      newQuiz._id,
      { $push: { questions: { $each: ids } } },
      { new: true }
    );

    await Module.findByIdAndUpdate(
      moduleId,
      { quiz: newQuiz._id },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Your quiz has been generated!",
      quizId: newQuiz._id,
      questionsCount: createdQuestions.length
    });
  } catch (error) {
    console.error("Error generating quiz:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get user's quiz
export const getMyQuiz = async (req, res) => {
  try {
    const quizId  = req.params.id;

    const quiz = await Quiz.findOne({
      _id: quizId,
      userId: req.user._id  // ✅ Only owner can access
    }).populate('questions');

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found"
      });
    }

    return res.status(200).json({
      success: true,
      quiz
    });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
