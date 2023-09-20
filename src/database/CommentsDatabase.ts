import { COMMENT_UPVOTES, CommentDB, CommentDBJoin, RatingDB } from "../models/Comment";
import { BaseDatabase } from "./BaseDatabase";
import { PostDatabase } from "./PostDatabase";
import { UserDatabase } from "./UserDatabase";

export class CommentDatabase extends BaseDatabase {
    static TABLE_COMMENTS = "comments"
    static TABLE_RATINGS = "comments_rating"

    insertComment = async (commentDB: CommentDB): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .insert(commentDB)
    }

    getComments = async (postId: string): Promise<CommentDBJoin[]> => {
        const result: CommentDBJoin[] = await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .select(
                `${CommentDatabase.TABLE_COMMENTS}.id`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                `${CommentDatabase.TABLE_COMMENTS}.content`,
                `${CommentDatabase.TABLE_COMMENTS}.upvotes`,
                `${CommentDatabase.TABLE_COMMENTS}.downvotes`,
                `${CommentDatabase.TABLE_COMMENTS}.created_at`,
                `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where(
                `${CommentDatabase.TABLE_COMMENTS}.post_id`,
                postId
            )

        return result
    }

    findCommentById = async (id: string): Promise<CommentDB | undefined> => {
        const [result] = await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .select()
            .where({ id })

        return result as CommentDB | undefined
    }

    updateComment = async (commentDB: CommentDB): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .update(commentDB)
            .where({ id: commentDB.id })
    }

    deleteCommentById = async (id: string): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .delete()
            .where({ id })
    }

    findRating = async (ratingDB: RatingDB)
        : Promise<COMMENT_UPVOTES | undefined> => {

        const [result]: Array<RatingDB | undefined> = await BaseDatabase
            .connection(CommentDatabase.TABLE_RATINGS)
            .select()
            .where({
                user_id: ratingDB.user_id,
                comment_id: ratingDB.comment_id
            })
        if (result === undefined) {
            return undefined
        } else if (result.rating === 1) {
            return COMMENT_UPVOTES.ALREADY_UPVOTED
        } else {
            return COMMENT_UPVOTES.ALREADY_DOWNVOTED
        }
    }

    removeRating = async (ratingDB: RatingDB)
        : Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_RATINGS)
            .delete()
            .where({
                user_id: ratingDB.user_id,
                comment_id: ratingDB.comment_id
            })
    }

    updateRating = async (ratingDB: RatingDB): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_RATINGS)
            .update(ratingDB)
            .where({
                user_id: ratingDB.user_id,
                comment_id: ratingDB.comment_id
            })
    }

    insertRating = async (ratingDB: RatingDB): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_RATINGS)
            .insert(ratingDB)
    }
}
