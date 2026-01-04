import { z } from 'zod';
export const UUID_Schema = z.string().uuid("Invalid UUID");
export const URL_Schema = z.string().url("Invalid Url");
export const Non_Empty_String_Schema = z.string().min(1, "Required");
