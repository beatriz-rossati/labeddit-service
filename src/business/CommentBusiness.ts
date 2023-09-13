import { CommentDatabase } from "../database/CommentsDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../dtos/comment/createComment.dto";
import { DeleteCommentInputDTO, DeleteCommentOutputDTO } from "../dtos/comment/deleteComment.dto";
import { EditCommentInputDTO, EditCommentOutputDTO } from "../dtos/comment/editComment.dto";
import { GetCommentsInputDTO, GetCommentsOutputDTO } from "../dtos/comment/getComment.dto";
import { RateCommentInputDTO, RateCommentOutputDTO } from "../dtos/comment/rateComment.dto";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { COMMENT_UPVOTES, Comment } from "../models/Comment";
import { RatingDB } from "../models/Comment";
import { Post } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentBusiness {
    constructor(
        private commentDatabase: CommentDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private postDatabase: PostDatabase
    ) { }

    createComment = async (input: CreateCommentInputDTO): Promise<CreateCommentOutputDTO> => {

        const { content, token, postId } = input

        const payload = this.tokenManager.getPayload(token)
        if (!payload) {
            throw new UnauthorizedError()
        }

        const id = this.idGenerator.generate()

        const postDB = await this.postDatabase.findPostById(postId)

        if (!postDB) {
            throw new NotFoundError("Não existe post com esse id")
        }

        const comment = new Comment(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name,
            postId,
        )

        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.upvotes,
            postDB.downvotes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            payload.name,
            postDB.comments_count
        )

        await this.commentDatabase.insertComment(comment.toCommentDB())

        post.increaseCommentsCount()
        await this.postDatabase.updatePost(post.toPostDB())

        return "Comentário criado com sucesso!"
    }

    getComments = async (input: GetCommentsInputDTO): Promise<GetCommentsOutputDTO> => {
        const { token, postId } = input

        const payload = this.tokenManager.getPayload(token)
        if (!payload) {
            throw new UnauthorizedError()
        }

        const commentJoinUserDB = await this.commentDatabase.getComments(postId)

        const comment = commentJoinUserDB.map((commentJoinUser) => {
            const comment = new Comment(
                commentJoinUser.id,
                commentJoinUser.content,
                commentJoinUser.upvotes,
                commentJoinUser.downvotes,
                commentJoinUser.created_at,
                commentJoinUser.updated_at,
                commentJoinUser.creator_id,
                commentJoinUser.creator_name,
                commentJoinUser.post_id
            )
            return comment.toCommentResponse()
        })
        return comment;
    }

    editComment = async (input: EditCommentInputDTO): Promise<EditCommentOutputDTO> => {

        const { content, token, idToEdit } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const commentDB = await this.commentDatabase.findCommentById(idToEdit)

        if (!commentDB) {
            throw new NotFoundError("Não existe comentário com esse id")
        }
        if (payload.id !== commentDB.creator_id) {
            throw new ForbiddenError("Você só pode editar seu próprio comentário.")
        }

        const comment = new Comment(
            commentDB.id,
            content,
            commentDB.upvotes,
            commentDB.downvotes,
            commentDB.created_at,
            commentDB.updated_at,
            commentDB.creator_id,
            payload.name,
            commentDB.post_id
        )

        const updatedCommentDB = comment.toCommentDB()
        await this.commentDatabase.updateComment(updatedCommentDB)

        return "Comentário editado."
    }

    deleteComment = async (input: DeleteCommentInputDTO): Promise<DeleteCommentOutputDTO> => {

        const { token, idToDelete } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const commentDB = await this.commentDatabase.findCommentById(idToDelete)

        if (!commentDB) {
            throw new NotFoundError("Não existe comentário com esse id")
        }

        const postDB = await this.postDatabase.findPostById(commentDB.post_id)

        if (!postDB) {
            throw new NotFoundError("Não existe post com esse id")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            if (payload.id !== commentDB.creator_id) {
                throw new ForbiddenError("Só o autor do comentário ou um admin pode deletá-lo.")
            }
        }

        await this.commentDatabase.deleteCommentById(idToDelete)

        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.upvotes,
            postDB.downvotes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            payload.name,
            postDB.comments_count
        )

        post.decreaseCommentsCount()
        await this.postDatabase.updatePost(post.toPostDB())

        return "Comentário deletado."
    }

    rateComment = async (input: RateCommentInputDTO): Promise<RateCommentOutputDTO> => {

        const { token, commentId, rating } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        console.log(payload)

        const commentDBWithCreator =
            await this.commentDatabase.findCommentById(commentId)


        if (!commentDBWithCreator) {
            throw new NotFoundError("Não existe comentário com esse Id")
        }

        const comment = new Comment(
            commentDBWithCreator.id,
            commentDBWithCreator.content,
            commentDBWithCreator.upvotes,
            commentDBWithCreator.downvotes,
            commentDBWithCreator.created_at,
            commentDBWithCreator.updated_at,
            commentDBWithCreator.creator_id,
            "", //Não é usado o creatorName nessa função
            commentDBWithCreator.post_id
        )

        const ratingDB: RatingDB = {
            user_id: payload.id,
            comment_id: commentId,
            rating: rating ? 1 : 0
        }
        console.log(ratingDB)

        const ratingExists = await this.commentDatabase.findRating(ratingDB)
        console.log(ratingExists)

        if (!ratingExists) {
            await this.commentDatabase.insertRating(ratingDB)
            rating ? comment.addUpvote() : comment.addDownvote()
        } else {
            if (ratingExists === COMMENT_UPVOTES.ALREADY_UPVOTED) {

                if (rating) {
                    await this.commentDatabase.removeRating(ratingDB)
                    comment.removeUpvote()
                } else {
                    await this.commentDatabase.updateRating(ratingDB)
                    comment.removeUpvote()
                    comment.addDownvote()
                }
            } else if (ratingExists === COMMENT_UPVOTES.ALREADY_DOWNVOTED) {
                console.log(ratingExists)

                if (rating === false) {
                    await this.commentDatabase.removeRating(ratingDB)
                    comment.removeDownvote()
                } else {
                    await this.commentDatabase.updateRating(ratingDB)
                    comment.removeDownvote()
                    comment.addUpvote()
                }
            }
        }
        console.log("aaa")

        await this.commentDatabase.updateComment(comment.toCommentDB())

        return undefined
    }
}