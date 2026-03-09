import { db } from "../../db/db.js";
import { users } from "../../drizzle/schema.js";
import { eq, or } from "drizzle-orm";

export interface CreateUserData {
  email: string;
  passwordHash: string;
  passwordPepperVersion: number;
  phoneNumber: string;
  dateOfBirth: string;
  name: string;
  picture?: string;
}

export interface UpdateUserData {
  email?: string;
  phoneNumber?: string;
  name?: string;
  picture?: string;
  emailVerifiedAt?: Date;
  isBlocked?: boolean;
}

export class UserDao {
  async create(data: CreateUserData) {
    const [user] = await db
      .insert(users)
      .values(data)
      .returning();

    return user;
  }

  async findById(id: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user || null;
  }

  async findByEmail(email: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user || null;
  }

  async findByPhoneNumber(phoneNumber: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.phoneNumber, phoneNumber))
      .limit(1);

    return user || null;
  }

  async findByEmailOrPhone(email: string, phoneNumber: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.phoneNumber, phoneNumber)))
      .limit(1);

    return user || null;
  }

  async update(id: string, data: UpdateUserData) {
    const [updatedUser] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return updatedUser || null;
  }

  async delete(id: string) {
    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning({ id: users.id });

    return deletedUser || null;
  }

  async verifyEmail(id: string) {
    return this.update(id, { emailVerifiedAt: new Date() });
  }

  async blockUser(id: string) {
    return this.update(id, { isBlocked: true });
  }

  async unblockUser(id: string) {
    return this.update(id, { isBlocked: false });
  }
}

export const userDao = new UserDao();