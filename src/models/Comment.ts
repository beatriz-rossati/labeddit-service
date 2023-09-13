export interface CommentDB {
    id: string,
    creator_id: string,
    content: string,
    upvotes: number,
    downvotes: number,
    created_at: string,
    updated_at: string,
    post_id: string
}

export interface CommentResponse {
    id: string,
    content: string,
    upvotes: number,
    downvotes: number,
    createdAt: string,
    updatedAt: string
    creator: {
        id: string,
        name: string
    }
}
export interface CommentDBJoin {
    id: string,
    creator_id: string,
    content: string,
    upvotes: number,
    downvotes: number,
    created_at: string,
    updated_at: string
    creator_name: string,
    post_id: string
}

export interface RatingDB {
    user_id: string,
    comment_id: string,
    rating: number
}

export enum COMMENT_UPVOTES {
    ALREADY_UPVOTED = "Comment already upvoted",
    ALREADY_DOWNVOTED = "Comment already downvoted"
}

export class Comment {
    constructor(
        private id: string,
        private content: string,
        private upvotes: number,
        private downvotes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string,
        private postId: string
    ) { }

    getId(): string {
        return this.id
    }
    setId(value: string): void {
        this.id = value
    }

    getContent(): string {
        return this.content
    }
    setContent(value: string): void {
        this.content = value
    }

    getUpvotes(): number {
        return this.upvotes
    }
    setUpvotes(value: number): void {
        this.upvotes = value
    }
    addUpvote = (): void => {
        this.upvotes++
    }
    removeUpvote = (): void => {
        this.upvotes--
    }

    getDownvotes(): number {
        return this.downvotes
    }
    setDownvotes(value: number): void {
        this.downvotes = value
    }
    addDownvote = (): void => {
        this.downvotes++
    }
    removeDownvote = (): void => {
        this.downvotes--
    }

    getCreatedAt(): string {
        return this.createdAt
    }
    setCreatedAt(value: string): void {
        this.createdAt = value
    }

    getUpdatedAt(): string {
        return this.updatedAt
    }
    setUpdatedAt(value: string): void {
        this.updatedAt = value
    }

    getCreatorId(value: string) {
        return this.creatorId
    }
    setCreatorId(value: string): void {
        this.creatorId
    }

    getCreatorName(value: string) {
        return this.creatorName
    }
    setCreatorName(value: string): void {
        this.creatorName
    }

    getPostId(): string {
        return this.postId
    }
    setPostId(value: string): void {
        this.postId = value
    }

    toCommentDB(): CommentDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            post_id: this.postId,
            content: this.content,
            upvotes: this.upvotes,
            downvotes: this.downvotes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    toCommentResponse(): CommentResponse {
        return {
            id: this.id,
            content: this.content,
            upvotes: this.upvotes,
            downvotes: this.downvotes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        }
    }
}