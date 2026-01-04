import { pgTable, uuid , integer, varchar, boolean, timestamp , uniqueIndex, index, pgEnum  } from 'drizzle-orm/pg-core'


//* Table of The users
export const userTable = pgTable("user",{
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    provider: varchar("provider" , {length:30}).notNull(),
    providerId:varchar('provider_id' , {length:255}).notNull().unique(),
    email:varchar("email",{length:255}).notNull().unique(),
    emailVerified:boolean("email_verified").notNull().default(false),
    name:varchar("name",{length:255}).notNull(),
    picture:varchar("picture",{length:255}),
    dateOfBirth: timestamp('date_of_birth'),
    phoneNumber: varchar('phone_number', { length: 20 }),
    profileCompleted: boolean('profile_completed').default(false),
    createdAt:timestamp("created_at" , {withTimezone:true}).notNull().defaultNow(),
    updatedAt:timestamp("updated_at", {withTimezone:true}).notNull().defaultNow().$onUpdate( () => new Date())
}, (table) => ({
    providerProviderIdKey: uniqueIndex('provider_provider_id_key').on(table.provider, table.providerId),
    emailIdx:index('email_idx').on(table.email)
}))

export type Db_User = typeof userTable.$inferSelect;
export type New_Db_User = typeof userTable.$inferInsert; 


//* Table of the Code We send to the user via email to verify (if he chooses to use email login instead of oauth)
export const varification_codes = pgTable('verification_codes' , {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255}).notNull(),
    code: varchar('code', {length: 6}).notNull(),
    expiredAt: timestamp('expired_at').notNull(),
    used: boolean('used').default(false).notNull(),
    createdAt: timestamp('created_at')
})

export type Db_Verification_Code = typeof varification_codes.$inferSelect;



//? TODO : 1 EmailVerificationCodes 

export const Email_Verfication_Codes = pgTable('EmailVerification', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', {length: 255}).notNull(),
    codeHash: varchar('codeHash', {length: 255}).notNull(),
    expiredAt: timestamp('expired_at', {withTimezone:true}).notNull(),
    usedAt: timestamp('used_at', {withTimezone:true}).notNull(),
    createdAt:timestamp("created_at" , {withTimezone:true}).notNull().defaultNow(),
})

//? TODO : 2  role_enum 

const roles = ['patient','doctor'] as const;
export const role_enum = pgEnum('roleEnum', roles)



//? TODO : 3  prescription_status_enum

const prescription_types = ['active','cancelled','completed'] as const;
export const prescription_status_enum = pgEnum('PrescriptionStatusEnum', prescription_types)


//? TODO : 4 appointment_status_enum 

const appointment_status = ['requested','confirmed','cancelled','completed'] as const;
export const appointment_status_enum = pgEnum('AppointmnetStatusEnum', appointment_status)


//? TODO : 5  appointment_type_enum

const appointment_types = ['in_person' , 'video' , 'chat'] as const;
export const appointment_type_enum = pgEnum('AppointmentTypeEnum', appointment_types)

 
//? TODO : 

//? TODO : 

//? TODO : 

//? TODO : 

//? TODO : 

//? TODO : 

//? TODO : 





