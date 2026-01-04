import { db } from "../db/db.js";
import { userTable } from "../drizzle/schema.js";
import { Provider_Profile_DTO } from "../schemas/Google_Schema.js";
import { Db_User } from "../drizzle/schema.js";
import { eq , and } from "drizzle-orm";

interface Create_Email_User_Input {
    email: string;
    name: string;
    emailVerified: boolean;
    provider: "email";
}


export async function Upsert_Google_user(input: Provider_Profile_DTO): Promise<Db_User>{
    const [user] = await db.insert(userTable).values({
        provider: input.provider,
        providerId:input.providerId,
        email: input.email,
        name: input.name,
        picture: input.picture ?? null,
        emailVerified: input.emailVerified
    })
    .onConflictDoUpdate({
        target:[userTable.provider, userTable.providerId],
        set: {
            email: input.email,
            name: input.name,
            picture: input.picture ?? null,
            emailVerified: input.emailVerified,
            updatedAt: new Date(),
        },
    })
    .returning();

    if(!user) throw new Error("Upsert Failed: returning() produced no row")
        return user;
}

export async function Create_Email_User(input: Create_Email_User_Input): Promise<Db_User> {
    // Check if user already exists
    const existingUser = await find_User_By_Email(input.email);
    
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const [user] = await db.insert(userTable).values({
        provider: input.provider,
        providerId: input.email, 
        email: input.email,
        name: input.name,
        picture: null,
        emailVerified: input.emailVerified
    })
    .returning();

    if (!user) throw new Error("Create user failed: returning() produced no row");
    return user;
}


export async function Update_User_Email_Verified(email: string): Promise<Db_User> {
    const [user] = await db
        .update(userTable)
        .set({ 
            emailVerified: true,
            updatedAt: new Date()
        })
        .where(eq(userTable.email, email))
        .returning();

    if (!user) throw new Error("Update failed: user not found");
    return user;
}

export async function find_User_By_Id(id: string): Promise<Db_User | null>{
    const rows = await db.select().from(userTable).where(eq(userTable.id , id)).limit(1)
    return rows[0] ?? null;
}

export async function find_User_By_Email(email: string) : Promise<Db_User | null>{
    const rows = await db.select().from(userTable).where(eq(userTable.email , email)).limit(1)
    return rows[0] ?? null;
}

export async function find_User_By_Provider(provider: string, providerId: string): Promise<Db_User | null> {
    const rows = await db
        .select()
        .from(userTable)
        .where(
            and(
                eq(userTable.provider, provider),
                eq(userTable.providerId, providerId)
            )
        )
        .limit(1);
    return rows[0] ?? null;
}