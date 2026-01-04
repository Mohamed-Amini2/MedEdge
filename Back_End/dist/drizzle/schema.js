import { pgTable, uuid, varchar, boolean, timestamp, uniqueIndex, index } from 'drizzle-orm/pg-core';
//* Table of The users
export const userTable = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    provider: varchar("provider", { length: 30 }).notNull().default('google'),
    providerId: varchar('provider_id', { length: 255 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("email_verified").notNull().default(false),
    name: varchar("name", { length: 255 }).notNull(),
    picture: varchar("picture", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
}, (table) => ({
    providerProviderIdKey: uniqueIndex('provider_provider_id_key').on(table.provider, table.providerId),
    emailIdx: index('email_idx').on(table.email)
}));
//* Table of the Code We send to the user via email to verify (if he chooses to use email login instead of oauth)
export const varification_codes = pgTable('verification_codes', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull(),
    code: varchar('code', { length: 6 }).notNull(),
    expiredAt: timestamp('expired_at').notNull(),
    used: boolean('used').default(false).notNull(),
    createdAt: timestamp('created_at')
});
