// models/quiz.model.js
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  userId: {  // ✅ Student ID
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  moduleId: {  // ✅ Module ID
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ],
  score: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// ✅ One quiz per user per module
quizSchema.index({ userId: 1, moduleId: 1 }, { unique: true });

export const Quiz = mongoose.model("Quiz", quizSchema);
