import { db } from '../db/db.js';
import { varification_codes } from '../drizzle/schema.js';
import { eq, and, gt } from 'drizzle-orm';
// interface Create_Verification_Params {
//     code: string ,
//     email: string,
//     expiredAt: Date,
// }
// interface Find_Valid_Verification_Code_Params{
//     email: string ,
//     code: string,
// }
export async function Create_Verification_code(code, email, expiredAt) {
    const [verificationCode] = await db.insert(varification_codes)
        .values({
        email,
        code,
        expiredAt,
        used: false
    }).returning();
    return verificationCode;
}
export async function Find_Valid_Verification_Code(email, code) {
    const [verificationCode] = await db.select().from(varification_codes)
        .where(and(eq(varification_codes.email, email), eq(varification_codes.code, code), eq(varification_codes.used, false), gt(varification_codes.expiredAt, new Date())))
        .limit(1);
    return verificationCode || null;
}
export async function Mark_Verification_Code_Used(id) {
    await db.update(varification_codes)
        .set({ used: true })
        .where(eq(varification_codes.id, id));
}
export async function Delete_Old_Verification_Codes(email) {
    await db.delete(varification_codes)
        .where(and(eq(varification_codes.email, email), eq(varification_codes.used, true)));
}
