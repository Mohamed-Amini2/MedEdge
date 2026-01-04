import {z} from 'zod'
import { Non_Empty_String_Schema } from './Common_Schema.js'

export const Verification_Code_Schema = z.object({
    email: z.string().email(),
    code: z.string().length(6, "Code must be 6 digits")
})

export type Verification_Code_DTO = z.infer<typeof Verification_Code_Schema>

export const Send_Verification_Request_Schema = z.object({
    email: z.string().email()
  });

export type Send_Verification_Request_DTO = z.infer<typeof Send_Verification_Request_Schema>
