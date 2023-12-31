import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { CreatePostSchema } from "../dtos/post/createPost.dto";
import { GetPostsSchema } from "../dtos/post/getPosts.dto";
import { EditPostSchema } from "../dtos/post/editPost.dto";
import { DeletePostSchema } from "../dtos/post/deletePost.dto";
import { RatePostSchema } from "../dtos/post/ratePost.dto";

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    createPost = async (req: Request, res: Response) => {
        try {
            const input = CreatePostSchema.parse({
                content: req.body.content,
                token: req.headers.authorization,
            })

            const output = await this.postBusiness.createPost(input)

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

    getPosts = async (req: Request, res: Response) => {
        try {
            const input = GetPostsSchema.parse({
                token: req.headers.authorization,
            })

            const output = await this.postBusiness.getPosts(input)

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

    editPost = async (req: Request, res: Response) => {
        try {
            const input = EditPostSchema.parse({
                token: req.headers.authorization,
                content: req.body.content,
                idToEdit: req.params.id
            })

            const output = await this.postBusiness.editPost(input)

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

    deletePost = async (req: Request, res: Response) => {
        try {
            const input = DeletePostSchema.parse({
                token: req.headers.authorization,
                idToDelete: req.params.id
            })

            const output = await this.postBusiness.deletePost(input)

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

    ratePost = async (req: Request, res: Response) => {
        try {
            const input = RatePostSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id,
                rating: req.body.rating
            })

            const output = await this.postBusiness.ratePost(input)

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