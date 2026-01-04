import { z } from 'zod';
export const Verification_Code_Schema = z.object({
    email: z.string().email(),
    code: z.string().length(6, "Code must be 6 digits")
});
export const Send_Verification_Request_Schema = z.object({
    email: z.string().email()
});
