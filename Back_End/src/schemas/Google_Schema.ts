import {string, z} from 'zod'
import { URL_Schema, Non_Empty_String_Schema } from './Common_Schema.js'

export const Google_Claims_Schema = z.object({
    sub: Non_Empty_String_Schema ,
    email: z.string().email(),
    email_verified: z.boolean().optional(),
    name: z.string().optional().default(""),
    picture: URL_Schema.optional()
})

export type Google_Claims_DTO = z.infer<typeof Google_Claims_Schema>

export const Provider_Profile_Schema = z.object({
    provider: z.enum(["google" , "yandex" , "microsoft" , "email"]),
    providerId: Non_Empty_String_Schema,
    email: z.string().email(),
    name: z.string(),
    picture: z.string().url().optional(),
    emailVerified: z.boolean()
})

export type Provider_Profile_DTO = z.infer<typeof Provider_Profile_Schema>



export function Google_Claims_To_Provider_Profile(
    claims: Google_Claims_DTO
  ): Provider_Profile_DTO {
    return {
      provider: "google",
      providerId: claims.sub,
      email: claims.email,
      name: claims.name ?? "",
      picture: claims.picture,
      emailVerified: claims.email_verified ?? false,
    };
  }