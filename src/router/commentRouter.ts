import express from "express";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CommentController } from "../controller/CommentController";
import { CommentBusiness } from "../business/CommentBusiness";
import { CommentDatabase } from "../database/CommentsDatabase";
import { PostDatabase } from "../database/PostDatabase";

export const commentRouter = express.Router()

const commentController = new CommentController(
    new CommentBusiness(
        new CommentDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new PostDatabase()
    )
)

commentRouter.post("", commentController.createComment)
commentRouter.get("", commentController.getComments)
commentRouter.put("/:id", commentController.editComment)
commentRouter.delete("/:id", commentController.deleteComment)
commentRouter.put("/:id/rate", commentController.rateComment)