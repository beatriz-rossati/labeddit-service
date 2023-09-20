import z from "zod"

export interface RatePostInputDTO {
    token: string,
    postId: string,
    rating: boolean
}

export type RatePostOutputDTO = string

export const RatePostSchema = z.object({
    token: z.string().min(1),
    postId: z.string().min(1),
    rating: z.boolean()
}).transform(data => data as RatePostInputDTO)