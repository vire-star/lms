import { Module } from "../models/modules.model.js";
import { Quiz } from "../models/quiz.model.js";

export const createQuiz = async(req ,res)=>{
    try {
        const {moduleId} = req.body;

        if(!moduleId){
            return res.status(401).json({
                message:"Module not found"
            })
        }

        const quiz = await Quiz.create({
            moduleId,
            

        })
        await Module.findByIdAndUpdate(moduleId,{
            $push:{quizzes:quiz._id}
        })
        return res.status(201).json({
            message:"Quiz created successfully",
            quiz
        })

    } catch (error) {
        console.log(`error from create quiz ,${error}`)
    }
}

// kjl
export const getQuiz = async (req, res) => {
  try {
    const moduleId = req.params.id;

    if (!moduleId) {
      return res.status(404).json({
        message: "Module not found",
      });
    }

    const allQuiz = await Quiz.find({ moduleId});

    if (!allQuiz ) {
      return res.status(404).json({
        message: "No quizzes found for this module",
      });
    }

    return res.status(200).json({ allQuiz });
  } catch (error) {
    console.log(`error from get quiz, ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
