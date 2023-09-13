import { Request, Response } from "express";
import { CommentBusiness } from "../business/CommentBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { CreateCommentSchema } from "../dtos/comment/createComment.dto";
import { GetCommentsSchema } from "../dtos/comment/getComment.dto";
import { EditCommentSchema } from "../dtos/comment/editComment.dto";
import { DeleteCommentSchema } from "../dtos/comment/deleteComment.dto";
import { RateCommentSchema } from "../dtos/comment/rateComment.dto";

export class CommentController {
    constructor(
        private commentBusiness: CommentBusiness
    ) { }

    createComment = async (req: Request, res: Response) => {
        try {
            const input = CreateCommentSchema.parse({
                content: req.body.content,
                token: req.headers.authorization,
                postId: req.body.postId
            })

            const output = await this.commentBusiness.createComment(input)

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

    getComments = async (req: Request, res: Response) => {
        try {
            const input = GetCommentsSchema.parse({
                token: req.headers.authorization,
                postId: req.params.postId
            })

            const output = await this.commentBusiness.getComments(input)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

    editComment = async (req: Request, res: Response) => {
        try {
            const input = EditCommentSchema.parse({
                token: req.headers.authorization,
                content: req.body.content,
                idToEdit: req.params.id
            })

            const output = await this.commentBusiness.editComment(input)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

    deleteComment = async (req: Request, res: Response) => {
        try {
            const input = DeleteCommentSchema.parse({
                token: req.headers.authorization,
                idToDelete: req.params.id
            })

            const output = await this.commentBusiness.deleteComment(input)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

    rateComment = async (req: Request, res: Response) => {
        try {
            const input = RateCommentSchema.parse({
                token: req.headers.authorization,
                commentId: req.params.id,
                rating: req.body.rating
            })

            const output = await this.commentBusiness.rateComment(input)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }
}