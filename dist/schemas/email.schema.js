import { z } from 'zod';
export const sendEmailSchema = z.object({
    to: z.string().email({ message: "Invalid recipient email" }),
    userName: z.string().min(1).max(100).transform(val => val.trim()),
    sentBy: z.string().email({ message: "Invalid sender email" }),
    message: z.string().min(10).max(5000).transform(val => val.trim()),
    from: z.literal("form@mail.sakhiledumisa.com").optional().default("form@mail.sakhiledumisa.com")
});
export const sendOtpSchema = z.object({
    email: z.string().email({ message: "Invalid email" })
});
export const verifyOtpSchema = z.object({
    email: z.string().email(),
    code: z.string().regex(/^\d{6}$/, "Code must be exactly 6 digits")
});
