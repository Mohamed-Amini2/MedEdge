import {z} from 'zod'
import { URL_Schema } from './Common_Schema.js'

export const Google_Start_Query_Schema = z.object({
    returnTo: URL_Schema.optional(),
});

export type Google_Start_Query_DTO = z.infer<typeof Google_Start_Query_Schema>;


export const Oauth_Callback_Query_Schema = z.object({
    code : z.string().min(1).optional(),
    state: z.string().min(1).optional(),
    error: z.string().optional(),
    error_description: z.string().optional()
})

export type Oauth_Callback_Query_DTO = z.infer<typeof Oauth_Callback_Query_Schema>