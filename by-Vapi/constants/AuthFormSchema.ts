import {z} from "zod"

export const authFormSchema = (type : FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3).max(20) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(8).max(100),
    })
}