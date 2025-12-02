
import { Comment } from "../models/comment.model.js";
import { Module } from "../models/modules.model.js";

export const createComment = async (req, res) => {
    try {
        const moduleId  = req.params.id;  // ✅ Destructure from params
        const { comment } = req.body;
        const userId = req.user._id;  // ✅ From auth middleware

        if(!moduleId){
            return res.status(401).json({
                message:"Please select Module"
            })
        }
        // ✅ Validation
        if (!comment) {
            return res.status(400).json({
                message: "Comment is required to post "
            });
        }

        // ✅ Check if module exists
        const module = await Module.findById(moduleId);
        if (!module) {
            return res.status(404).json({
                message: "Module not found"
            });
        }

        // ✅ Create comment with all fields
        const newComment = await Comment.create({
            userId,
            moduleId,
            comment
        });

        // ✅ Push comment ID to module's comments array
        await Module.findByIdAndUpdate(
            moduleId,
            { $push: { comments: newComment._id } },  // Add to array
            { new: true }
        );

        // ✅ Populate user details before sending response
        const populatedComment = await Comment.findById(newComment._id)
            .populate('userId', 'fullName email');

        return res.status(201).json({
            success: true,
            message: "Comment posted successfully",
            comment: populatedComment
        });

    } catch (error) {
        console.log(`Error from create comment:`, error);
        return res.status(500).json({
            success: false,
            message: "Failed to post comment",
            error: error.message
        });
    }
};
