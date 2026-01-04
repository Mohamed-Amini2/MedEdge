import { z } from 'zod';
import { UUID_Schema, URL_Schema } from './Common_Schema.js';
export const Public_User_Schema = z.object({
    id: UUID_Schema,
    email: z.string().email(),
    name: z.string(),
    picture: URL_Schema.nullable().optional(),
    provider: z.string(),
    emailVerified: z.boolean()
});
export function To_Public_User(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture ?? null,
        provider: user.provider,
        emailVerified: user.emailVerified,
    };
}
