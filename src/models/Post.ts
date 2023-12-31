export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    upvotes: number,
    downvotes: number,
    created_at: string,
    updated_at: string,
    comments_count: number
}

export interface PostDBJoin {
    id: string,
    creator_id: string,
    content: string,
    upvotes: number,
    downvotes: number,
    created_at: string,
    updated_at: string,
    creator_name: string,
    comments_count: number
}

export interface PostResponse {
    id: string,
    content: string,
    upvotes: number,
    downvotes: number,
    createdAt: string,
    updatedAt: string
    creator: {
        id: string,
        name: string
    },
    commentsCount: number
}

export interface RatingDB {
    user_id: string,
    post_id: string,
    rating: number
}

export enum POST_UPVOTES {
    ALREADY_UPVOTED = "Already upvoted",
    ALREADY_DOWNVOTED = "Already downvoted"
}

export class Post {
    constructor(
        private id: string,
        private content: string,
        private upvotes: number,
        private downvotes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string,
        private commentsCount: number
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
    addUpvote = (): void => {
        this.upvotes++
    }
    removeUpvote = (): void => {
        this.upvotes--
    }

    getDownvotes(): number {
        return this.downvotes
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

    getCommentsCount(): number {
        return this.commentsCount
    }
    increaseCommentsCount = (): void => {
        this.commentsCount++
    }
    decreaseCommentsCount = (): void => {
        this.commentsCount--
    }

    toPostDB(): PostDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            upvotes: this.upvotes,
            downvotes: this.downvotes,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            comments_count: this.commentsCount
        }
    }

    toPostResponse(): PostResponse {
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
            },
            commentsCount: this.commentsCount
        }
    }
}