import z from "zod"

export interface DeleteCommentInputDTO {
    idToDelete: string,
    token: string
}

export type DeleteCommentOutputDTO = String

export const DeleteCommentSchema = z.object({
    idToDelete: z.string().min(1),
    token: z.string().min(1)
})