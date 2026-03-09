import {boolean, z} from 'zod'


export const SessionData = z.object({
    userId: z.string(),
    name: z.string(),
    email: z.string().email(),
    avatar: z.string(),
    isAuthenticated: z.boolean().optional(),
}) 

