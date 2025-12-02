import { ENV } from "../helpers/env.js";
// import { Module } from "../models/modules.model.js"
import { Question } from "../models/question.model.js"
import { Quiz } from "../models/quiz.model.js"
// import { Quiz } from "../models/quiz.model.js"
// import { Quiz } from "../models/quiz.model"
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
export const getQuestion = async(req , res)=>{
    try {

        const quizId = req.params.id
        const getQuestionFromQuiz=await Quiz.findById(quizId).populate('questions')

        const title = getQuestionFromQuiz

        

        return res.status(201).json(title)
    } catch (error) {
        console.log(`error from create Quiz question , ${error}`)
    }
}



// export const createQuestion = async(req, res)=>{
//     const {moduleId, content, quizId} = req.body

//     if(!moduleId || !content || !quizId){
//         return res.status(401).json({
//             message:"PLease provide all the details"
//         })
//     }
//         // const getQuestionFromQuiz=await Module.findById(moduleId)

//         // const title = getQuestionFromQuiz.title

//     const prompt = `
//     Generate 10 technical interview questions for a ${
//       content
//     } .
    
//     Each question should be multiple choice with 4 options.
    
//     Return the response in this JSON format only, no additional text:
//     {
//       "questions": [
//         {
//           "question": "string",
//           "options": ["string", "string", "string", "string"],
//           "correctOption": "string",
//           "explanation": "string"
//         }
//       ]
//     }
//   `;
//  const result = await model.generateContent(prompt);
//     const response = result.response;
//     const text = response.text();
//     const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    
// let parsed;
// try {
//   parsed = JSON.parse(cleanedText); // { questions: [...] }
// } catch (e) {
//   console.error("Failed to parse Gemini JSON:", cleanedText);
//   return res.status(500).json({ message: "AI response parsing failed" });
// }

// const generatedQuestions = parsed.questions || [];
// if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
//   return res.status(500).json({ message: "No questions generated" });
// }




// const createdQuestions = [];

// for (const q of generatedQuestions) {
//   const doc = await Question.create({
//     quizId,
//     content: q.question,
//     options: q.options,
//     correctOption: q.correctOption,
//     explanation: q.explanation,
//   });
//   createdQuestions.push(doc);
// }

// const ids = createdQuestions.map(q => q._id);

// await Quiz.findByIdAndUpdate(
//   quizId,
//   { $push: { questions: { $each: ids } } },
//   { new: true }
// );


// //        const AllQuestions = await Question.create({
// //          content,
// //          quizId
// //        })

// //        await AllQuestions.save()
// //       const quiz = await Quiz.findById(quizId);
// // if (!quiz) {
// //   return res.status(404).json({ message: "Quiz not found" });
// // }

// // quiz.questions.push(AllQuestions._id);
// // await quiz.save();

// // console.log("Updated Quiz:", updatedQuiz);
       

//         // return res.status(201).json(AllQuestions)
// }



export const createQuestion = async (req, res) => {
  try {
    const { moduleId, content, quizId } = req.body;

    if (!moduleId || !content || !quizId) {
      return res.status(400).json({
        message: "Please provide all the details",
      });
    }

  const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found"
      });
    }

    // ✅ Check if questions already generated
    if (quiz.questions && quiz.questions.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Questions already generated for this quiz. Create a new quiz to generate more questions.",
        existingQuestionsCount: quiz.questions.length
      });
    }

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
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (e) {
      console.error("Failed to parse Gemini JSON:", cleanedText);
      return res.status(500).json({ message: "AI response parsing failed" });
    }

    const generatedQuestions = parsed.questions || [];
    if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      return res.status(500).json({ message: "No questions generated" });
    }

    const createdQuestions = [];

    for (const q of generatedQuestions) {
      const doc = await Question.create({
        quizId,
        content: q.question,
        options: q.options,
        correctOption: q.correctOption,
        explanation: q.explanation,
      });
      createdQuestions.push(doc);
    }

    const ids = createdQuestions.map((q) => q._id);

    await Quiz.findByIdAndUpdate(
      quizId,
      { $push: { questions: { $each: ids } } },
      { new: true }
    );

    return res.status(201).json({
      message: "Questions generated and added to quiz",
      questions: createdQuestions,
    });
  } catch (error) {
    console.log(`error from createQuestion , ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
