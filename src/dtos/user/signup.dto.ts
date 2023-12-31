import z from "zod"

export interface SignupInputDTO {
    name: string,
    email: string,
    password: string,
    adminCode?: string
}

export interface SignupOutputDTO {
    token: string,
    userId: string
}

export const SignupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    adminCode: z.string().optional()
}).transform(data => data as SignupInputDTO)