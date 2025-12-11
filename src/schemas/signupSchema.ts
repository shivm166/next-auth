import { z } from "zod"

export const signupSchema = z.object({
    email: z.email({error: "Invalid Email Address"}),
    phone_no: z.string().length(10, {error: "Phone number must be of 10 digits"}),
    password: z.string().min(6, {error: "Password must be atleast 6 character"})
})