import z from "zod"

export interface RateCommentInputDTO {
    token: string,
    commentId: string,
    rating: boolean
}

export type RateCommentOutputDTO = undefined

export const RateCommentSchema = z.object({
    token: z.string().min(1),
    commentId: z.string().min(1),
    rating: z.boolean()
}).transform(data => data as RateCommentInputDTO)