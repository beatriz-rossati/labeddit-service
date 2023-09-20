import { RatingDB, POST_UPVOTES, PostDB, PostDBJoin } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {

    static TABLE_POSTS = "posts"
    static TABLE_RATINGS = "posts_rating"

    insertPost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(postDB)
    }

    getPosts = async (): Promise<PostDBJoin[]> => {
        const result: PostDBJoin[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.upvotes`,
                `${PostDatabase.TABLE_POSTS}.downvotes`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`,
                `${PostDatabase.TABLE_POSTS}.comments_count`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )

        return result
    }

    findPostById = async (id: string): Promise<PostDB | undefined> => {
        const [result] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({ id })

        return result as PostDB | undefined
    }

    updatePost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(postDB)
            .where({ id: postDB.id })
    }

    deletePostById = async (id: string): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id })
    }

    findPostByIdJoinUser = async (id: string): Promise<PostDBJoin | undefined> => {

        const [result]: Array<PostDBJoin | undefined> = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.upvotes`,
                `${PostDatabase.TABLE_POSTS}.downvotes`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ [`${PostDatabase.TABLE_POSTS}.id`] : id })

        return result
    }

    findRating = async (ratingDB: RatingDB)
        : Promise<POST_UPVOTES | undefined> => {

        const [result]: Array<RatingDB | undefined> = await BaseDatabase
            .connection(PostDatabase.TABLE_RATINGS)
            .select()
            .where({
                user_id: ratingDB.user_id,
                post_id: ratingDB.post_id
            })

        if (result === undefined) {
            return undefined
        } else if (result.rating === 1) {
            return POST_UPVOTES.ALREADY_UPVOTED
        } else {
            return POST_UPVOTES.ALREADY_DOWNVOTED
        }
    }

    removeRating = async (ratingDB: RatingDB)
        : Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_RATINGS)
            .delete()
            .where({
                user_id: ratingDB.user_id,
                post_id: ratingDB.post_id
            })
    }

    updateRating = async (ratingDB: RatingDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_RATINGS)
            .update(ratingDB)
            .where({
                user_id: ratingDB.user_id,
                post_id: ratingDB.post_id
            })
    }

    insertRating = async (ratingDB: RatingDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_RATINGS)
            .insert(ratingDB)
    }
}