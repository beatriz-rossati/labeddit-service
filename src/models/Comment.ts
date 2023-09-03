// export class Post {
//     constructor(
//         private id: string,
//         private content: string,
//         private upvotes: number,
//         private downvotes: number,
//         private createdAt: string,
//         private updatedAt: string,
//         private creatorId: string,
//         private creatorName: string
//     ) { }

//     getId(): string {
//         return this.id
//     }
//     setId(value: string): void {
//         this.id = value
//     }

//     getContent(): string {
//         return this.content
//     }
//     setContent(value: string): void {
//         this.content = value
//     }

//     getUpvotes(): number {
//         return this.upvotes
//     }
//     setUpvotes(value: number): void {
//         this.upvotes = value
//     }
//     addUpvote = (): void => {
//         this.upvotes++
//     }
//     removeUpvote = (): void => {
//         this.upvotes--
//     }

//     getDownvotes(): number {
//         return this.downvotes
//     }
//     setDownvotes(value: number): void {
//         this.downvotes = value
//     }
//     addDownvote = (): void => {
//         this.downvotes++
//     }
//     removeDownvote = (): void => {
//         this.downvotes--
//     }

//     getCreatedAt(): string {
//         return this.createdAt
//     }
//     setCreatedAt(value: string): void {
//         this.createdAt = value
//     }

//     getUpdatedAt(): string {
//         return this.updatedAt
//     }
//     setUpdatedAt(value: string): void {
//         this.updatedAt = value
//     }

//     getCreatorId(value: string) {
//         return this.creatorId
//     }
//     setCreatorId(value: string): void {
//         this.creatorId
//     }

//     getCreatorName(value: string) {
//         return this.creatorName
//     }
//     setCreatorName(value: string): void {
//         this.creatorName
//     }

//     toPostDB(): PostDB {
//         return {
//             id: this.id,
//             creator_id: this.creatorId,
//             content: this.content,
//             upvotes: this.upvotes,
//             downvotes: this.downvotes,
//             created_at: this.createdAt,
//             updated_at: this.updatedAt
//         }
//     }

//     toPostResponse(): PostResponse {
//         return {
//             id: this.id,
//             content: this.content,
//             upvotes: this.upvotes,
//             downvotes: this.downvotes,
//             createdAt: this.createdAt,
//             updatedAt: this.updatedAt,
//             creator: {
//                 id: this.creatorId,
//                 name: this.creatorName
//             }
//         }
//     }
// }