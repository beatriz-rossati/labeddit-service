import z from "zod"
import { CommentResponse } from "../../models/Comment"

export interface GetCommentsInputDTO {
    token: string,
    postId: string
}

export type GetCommentsOutputDTO = CommentResponse[]

export const GetCommentsSchema = z.object({
    token: z.string().min(1),
    postId: z.string().min(1)
}).transform(data => data as GetCommentsInputDTO)