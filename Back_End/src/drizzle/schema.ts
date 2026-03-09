import {
  pgTable,
  pgEnum,
  uuid,
  integer,
  varchar,
  boolean,
  timestamp,
  text,
  jsonb,
  date,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";


export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),

    email: varchar("email", { length: 255 }).notNull().unique(),

    passwordHash: text("password_hash").notNull(),
    passwordPepperVersion: integer("password_pepper_version").notNull().default(1),

    phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(),
    dateOfBirth: date("date_of_birth").notNull(),

    emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
    isBlocked: boolean("is_blocked").notNull().default(false),

    name: varchar("name", { length: 255 }).notNull(),
    picture: varchar("picture", { length: 255 }),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    emailIdx: index("users_email_idx").on(t.email),
    phoneIdx: index("users_phone_idx").on(t.phoneNumber),
  })
);

// /* =========================
//    ENUMS
// ========================= */

// export const roleEnum = pgEnum("role_enum", ["patient", "doctor", "admin"]);

// export const otpPurposeEnum = pgEnum("otp_purpose_enum", [
//   "email_verify",
//   "login_2fa",
//   "password_reset",
// ]);

// export const recordShareReasonEnum = pgEnum("record_share_reason_enum", [
//   "patient_shared",
//   "doctor_requested",
//   "clinic_transfer",
//   "follow_up",
//   "other",
// ]);

// export const recordVisibilityEnum = pgEnum("record_visibility_enum", [
//   "private",          
//   "appointment_only", 
//   "shared"            
// ]);


// export const genderEnum = pgEnum("gender_enum", ["male", "female", "other", "unknown"]);

// export const dayOfWeekEnum = pgEnum("day_of_week_enum", [
//   "mon","tue","wed","thu","fri","sat","sun"
// ]);

// export const bloodTypeEnum = pgEnum("blood_type_enum", [
//   "A_PLUS",
//   "A_MINUS",
//   "B_PLUS",
//   "B_MINUS",
//   "AB_PLUS",
//   "AB_MINUS",
//   "O_PLUS",
//   "O_MINUS",
// ]);

// export const appointmentTypeEnum = pgEnum("appointment_type_enum", ["in_person", "video"]);

// export const appointmentStatusEnum = pgEnum("appointment_status_enum", [
//   "requested",
//   "confirmed",
//   "cancelled",
//   "completed",
//   "no_show",
// ]);

// export const recordTypeEnum = pgEnum("record_type_enum", [
//   "lab",
//   "imaging",
//   "note",
//   "discharge",
//   "other",
// ]);

// export const prescriptionStatusEnum = pgEnum("prescription_status_enum", [
//   "active",
//   "completed",
//   "cancelled",
// ]);

// export const messageTypeEnum = pgEnum("message_type_enum", ["text", "file"]);

// export const invoiceStatusEnum = pgEnum("invoice_status_enum", ["draft", "issued", "paid", "void"]);

// export const paymentProviderEnum = pgEnum("payment_provider_enum", ["stripe", "yookassa", "yandex" , "other"]);

// export const paymentStatusEnum = pgEnum("payment_status_enum", [
//   "pending",
//   "succeeded",
//   "failed",
//   "refunded",
// ]);

// export const notificationTypeEnum = pgEnum("notification_type_enum", [
//   "appointment",
//   "message",
//   "billing",
//   "system",
// ]);

// export const doctorVerificationEnum = pgEnum("doctor_verification_enum", [
//   "pending",
//   "approved",
//   "rejected",
// ]);

// /* =========================
//    USERS + RBAC + OTP
// ========================= */


// ////////////////////////////////////////////////////////////////////////////////////////////////////


// export const roles = pgTable(
//   "roles",
//   {
//     id: uuid("id").primaryKey().defaultRandom().notNull(),
//     name: roleEnum("name").notNull().unique(),
//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//   },
//   (t) => ({
//     roleNameIdx: index("roles_name_idx").on(t.name),
//   })
// );

// ////////////////////////////////////////////////////////////////////////////////////////////////////



// export const userRoles = pgTable(
//   "user_roles",
//   {
//     userId: uuid("user_id")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),
//     roleId: uuid("role_id")
//       .notNull()
//       .references(() => roles.id, { onDelete: "cascade" }),
//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//   },
//   (t) => ({
//     pk: uniqueIndex("user_roles_pk").on(t.userId, t.roleId),
//     userIdx: index("user_roles_user_idx").on(t.userId),
//     roleIdx: index("user_roles_role_idx").on(t.roleId),
//   })
// );

// export type Db_User = typeof users.$inferSelect;
// export type New_User = typeof users.$inferInsert;

// ////////////////////////////////////////////////////////////////////////////////////////////////////

// export const emailOtps = pgTable(
//   "email_otps",
//   {
//     id: uuid("id").primaryKey().defaultRandom().notNull(),

//     userId: uuid("user_id")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),

//     email: varchar("email", { length: 255 }).notNull(),
//     purpose: otpPurposeEnum("purpose").notNull(),

//     codeHash: varchar("code_hash", { length: 128 }).notNull(),

//     expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
//     usedAt: timestamp("used_at", { withTimezone: true }),
//     attempts: integer("attempts").notNull().default(0),

//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//   },
//   (t) => ({
//     activeIdx: index("email_otps_active_idx").on(t.userId, t.purpose, t.usedAt, t.expiresAt),
//   })
// );

// /* =========================
//    PROFILES
// ========================= */

// export const doctorProfiles = pgTable("doctor_profiles", {
//   userId: uuid("user_id")
//     .primaryKey()
//     .references(() => users.id, { onDelete: "cascade" }),

//   qualifications: varchar("qualifications", { length: 255 }).notNull(),
//   specialization: varchar("specialization", { length: 120 }).notNull(),
//   experienceYears: integer("experience_years").notNull().default(0),
//   department: varchar("department", { length: 120 }),

//   consultationFeeCents: integer("consultation_fee_cents").notNull().default(0),
//   bio: text("bio"),

//   verificationStatus: doctorVerificationEnum("verification_status").notNull().default("pending"),
//   verifiedAt: timestamp("verified_at", { withTimezone: true }),

//   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//   updatedAt: timestamp("updated_at", { withTimezone: true })
//     .notNull()
//     .defaultNow()
//     .$onUpdate(() => new Date()),
// });

// export const patientProfiles = pgTable("patient_profiles", {
//   userId: uuid("user_id")
//     .primaryKey()
//     .references(() => users.id, { onDelete: "cascade" }),

//   address: text("address"),
//   gender: genderEnum("gender").notNull().default("unknown"),
//   bloodType: bloodTypeEnum("blood_type"),

//   insuranceDetails: jsonb("insurance_details"),
//   emergencyContact: jsonb("emergency_contact"),

//   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//   updatedAt: timestamp("updated_at", { withTimezone: true })
//     .notNull()
//     .defaultNow()
//     .$onUpdate(() => new Date()),
// });

// export const recordShares = pgTable(
//   "record_shares",
//   {
//     id: uuid("id").primaryKey().defaultRandom().notNull(),

//     recordId: uuid("record_id")
//       .notNull()
//       .references(() => medicalRecords.id, { onDelete: "cascade" }),

//     patientId: uuid("patient_id")
//       .notNull()
//       .references(() => patientProfiles.userId, { onDelete: "cascade" }),

//     sharedByUserId: uuid("shared_by_user_id")
//       .notNull()
//       .references(() => users.id, { onDelete: "restrict" }),

//     sharedWithUserId: uuid("shared_with_user_id")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),

//     reason: recordShareReasonEnum("reason").notNull().default("patient_shared"),
//     note: text("note"),

//     expiresAt: timestamp("expires_at", { withTimezone: true }),
//     revokedAt: timestamp("revoked_at", { withTimezone: true }),
//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//   },
//   (t) => ({
//     recordIdx: index("record_shares_record_idx").on(t.recordId),
//     targetIdx: index("record_shares_target_idx").on(t.sharedWithUserId),
//     activeIdx: index("record_shares_active_idx").on(t.sharedWithUserId, t.revokedAt),
//     uniq: uniqueIndex("record_shares_uniq").on(t.recordId, t.sharedWithUserId),
//   })
// );

// /* =========================
//    SCHEDULING
// ========================= */

// export const appointments = pgTable(
//   "appointments",
//   {
//     id: uuid("id").primaryKey().defaultRandom().notNull(),

//     doctorId: uuid("doctor_id")
//       .notNull()
//       .references(() => doctorProfiles.userId, { onDelete: "restrict" }),

//     patientId: uuid("patient_id")
//       .notNull()
//       .references(() => patientProfiles.userId, { onDelete: "restrict" }),

//     scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
//     durationMin: integer("duration_min").notNull().default(30),

//     appointmentType: appointmentTypeEnum("appointment_type").notNull(),
//     status: appointmentStatusEnum("status").notNull().default("requested"),

//     chatOpensAt: timestamp("chat_opens_at", { withTimezone: true })
//     .notNull()
//     .defaultNow(),

//     chatClosesAt: timestamp("chat_closes_at", { withTimezone: true }),

//     chatEnabled: boolean("chat_enabled").notNull().default(true),

//     patientNotes: text("patient_notes"),
//     doctorNotes: text("doctor_notes"),

//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//     updatedAt: timestamp("updated_at", { withTimezone: true })
//       .notNull()
//       .defaultNow()
//       .$onUpdate(() => new Date()),
//   },
//   (t) => ({
//     doctorIdx: index("appointments_doctor_idx").on(t.doctorId),
//     patientIdx: index("appointments_patient_idx").on(t.patientId),
//     scheduledIdx: index("appointments_scheduled_idx").on(t.scheduledAt),
//   })
// );

// export const doctorWeeklySchedule = pgTable(
//   "doctor_weekly_schedule",
//   {
//     id: uuid("id").primaryKey().defaultRandom().notNull(),
//     doctorId: uuid("doctor_id")
//       .notNull()
//       .references(() => doctorProfiles.userId, { onDelete: "cascade" }),

//     dayOfWeek: dayOfWeekEnum("day_of_week").notNull(),

//     // store "09:00" style
//     startTime: varchar("start_time", { length: 5 }).notNull(),
//     endTime: varchar("end_time", { length: 5 }).notNull(),

//     isActive: boolean("is_active").notNull().default(true),

//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//     updatedAt: timestamp("updated_at", { withTimezone: true })
//       .notNull()
//       .defaultNow()
//       .$onUpdate(() => new Date()),
//   },
//   (t) => ({
//     doctorIdx: index("doctor_weekly_schedule_doctor_idx").on(t.doctorId),
//   })
// );

// export const doctorAvailability = pgTable(
//   "doctor_availability",
//   {
//     id: uuid("id").primaryKey().defaultRandom().notNull(),

//     doctorId: uuid("doctor_id")
//       .notNull()
//       .references(() => doctorProfiles.userId, { onDelete: "cascade" }),

//     startAt: timestamp("start_at", { withTimezone: true }).notNull(),
//     endAt: timestamp("end_at", { withTimezone: true }).notNull(),
    
//     isAvailable: boolean("is_available").notNull(),

//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//     updatedAt: timestamp("updated_at", { withTimezone: true })
//       .notNull()
//       .defaultNow()
//       .$onUpdate(() => new Date()),
//   },
//   (t) => ({
//     doctorIdx: index("doctor_availability_doctor_idx").on(t.doctorId),
//     rangeIdx: index("doctor_availability_range_idx").on(t.startAt, t.endAt),
//   })
// );

// /* =========================
//    MEDICAL RECORDS
// ========================= */

// export const medicalRecords = pgTable(
//   "medical_records",
//   {
//     id: uuid("id").primaryKey().defaultRandom().notNull(),

//     patientId: uuid("patient_id")
//       .notNull()
//       .references(() => patientProfiles.userId, { onDelete: "cascade" }),

//     uploadedByUserId: uuid("uploaded_by_user_id")
//       .notNull()
//       .references(() => users.id, { onDelete: "restrict" }),

//     visibility: recordVisibilityEnum("visibility").notNull().default("appointment_only"),
    
//     recordType: recordTypeEnum("record_type").notNull(),
//     title: varchar("title", { length: 255 }).notNull(),
//     description: text("description"),

//     storageKey: varchar("storage_key", { length: 512 }).notNull(),
//     mimeType: varchar("mime_type", { length: 120 }).notNull(),
//     sizeBytes: integer("size_bytes").notNull(),

//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//     updatedAt: timestamp("updated_at", { withTimezone: true })
//       .notNull()
//       .defaultNow()
//       .$onUpdate(() => new Date()),
//   },
//   (t) => ({
//     patientIdx: index("medical_records_patient_idx").on(t.patientId),
//     uploadedByIdx: index("medical_records_uploaded_by_idx").on(t.uploadedByUserId),
//   })
// );

// export const appointmentRecords = pgTable(
//   "appointment_records",
//   {
//     appointmentId: uuid("appointment_id")
//       .notNull()
//       .references(() => appointments.id, { onDelete: "cascade" }),

//     recordId: uuid("record_id")
//       .notNull()
//       .references(() => medicalRecords.id, { onDelete: "cascade" }),

//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//   },
//   (t) => ({
//     pk: uniqueIndex("appointment_records_pk").on(t.appointmentId, t.recordId),
//     appointmentIdx: index("appointment_records_appointment_idx").on(t.appointmentId),
//     recordIdx: index("appointment_records_record_idx").on(t.recordId),
//   })
// );

// /* =========================
//    PRESCRIPTIONS
// ========================= */

// export const prescriptions = pgTable(
//   "prescriptions",
//   {
//     id: uuid("id").primaryKey().defaultRandom().notNull(),

//     doctorId: uuid("doctor_id")
//       .notNull()
//       .references(() => doctorProfiles.userId, { onDelete: "restrict" }),

//     patientId: uuid("patient_id")
//       .notNull()
//       .references(() => patientProfiles.userId, { onDelete: "restrict" }),

//     appointmentId: uuid("appointment_id").references(() => appointments.id, {
//       onDelete: "set null",
//     }),

//     medication: varchar("medication", { length: 255 }).notNull(),
//     dosage: varchar("dosage", { length: 255 }).notNull(),
//     instructions: text("instructions"),

//     durationDays: integer("duration_days").notNull().default(1),
//     prescribedAt: timestamp("prescribed_at", { withTimezone: true }).notNull().defaultNow(),

//     status: prescriptionStatusEnum("status").notNull().default("active"),
//     refills: integer("refills").notNull().default(0),

//     notes: text("notes"),

//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//     updatedAt: timestamp("updated_at", { withTimezone: true })
//       .notNull()
//       .defaultNow()
//       .$onUpdate(() => new Date()),
//   },
//   (t) => ({
//     patientIdx: index("prescriptions_patient_idx").on(t.patientId),
//     doctorIdx: index("prescriptions_doctor_idx").on(t.doctorId),
//     appointmentIdx: index("prescriptions_appointment_idx").on(t.appointmentId),
//   })
// );

// /* =========================
//    MESSAGING
// ========================= */

// export const conversations = pgTable(
//   "conversations",
//   {
//     id: uuid("id").primaryKey().defaultRandom().notNull(),

//     patientId: uuid("patient_id")
//       .notNull()
//       .references(() => patientProfiles.userId, { onDelete: "cascade" }),

//     doctorId: uuid("doctor_id")
//       .notNull()
//       .references(() => doctorProfiles.userId, { onDelete: "cascade" }),

//       appointmentId: uuid("appointment_id")
//       .notNull()
//       .references(() => appointments.id, { onDelete: "cascade" }),

//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//     updatedAt: timestamp("updated_at", { withTimezone: true })
//       .notNull()
//       .defaultNow()
//       .$onUpdate(() => new Date()),
//   },
//   (t) => ({
//     patientIdx: index("conversations_patient_idx").on(t.patientId),
//     doctorIdx: index("conversations_doctor_idx").on(t.doctorId),
//     appointmentIdx: index("conversations_appointment_idx").on(t.appointmentId),
//     appointmentUnique: uniqueIndex("conversations_appointment_unique").on(t.appointmentId),
//     })
// );

// export const messages = pgTable(
//   "messages",
//   {
//     id: uuid("id").primaryKey().defaultRandom().notNull(),

//     conversationId: uuid("conversation_id")
//       .notNull()
//       .references(() => conversations.id, { onDelete: "cascade" }),

//     senderUserId: uuid("sender_user_id")
//       .notNull()
//       .references(() => users.id, { onDelete: "restrict" }),

//     messageType: messageTypeEnum("message_type").notNull().default("text"),
//     body: text("body").notNull(),
//     attachmentKey: varchar("attachment_key", { length: 512 }),

//     sentAt: timestamp("sent_at", { withTimezone: true }).notNull().defaultNow(),
//     readAt: timestamp("read_at", { withTimezone: true }),

//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//   },
//   (t) => ({
//     convoIdx: index("messages_conversation_idx").on(t.conversationId),
//     senderIdx: index("messages_sender_idx").on(t.senderUserId),
//     sentIdx: index("messages_sent_idx").on(t.sentAt),
//   })
// );

// // /* =========================
// //    BILLING
// // ========================= */

// // export const invoices = pgTable(
// //   "invoices",
// //   {
// //     id: uuid("id").primaryKey().defaultRandom().notNull(),

// //     patientId: uuid("patient_id")
// //       .notNull()
// //       .references(() => patientProfiles.userId, { onDelete: "restrict" }),

// //     doctorId: uuid("doctor_id")
// //       .notNull()
// //       .references(() => doctorProfiles.userId, { onDelete: "restrict" }),

// //     appointmentId: uuid("appointment_id").references(() => appointments.id, {
// //       onDelete: "set null",
// //     }),

// //     amountCents: integer("amount_cents").notNull(),
// //     currency: varchar("currency", { length: 10 }).notNull().default("RUB"),
// //     status: invoiceStatusEnum("status").notNull().default("draft"),

// //     issuedAt: timestamp("issued_at", { withTimezone: true }),
// //     dueAt: timestamp("due_at", { withTimezone: true }),

// //     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
// //     updatedAt: timestamp("updated_at", { withTimezone: true })
// //       .notNull()
// //       .defaultNow()
// //       .$onUpdate(() => new Date()),
// //   },
// //   (t) => ({
// //     patientIdx: index("invoices_patient_idx").on(t.patientId),
// //     doctorIdx: index("invoices_doctor_idx").on(t.doctorId),
// //     appointmentIdx: index("invoices_appointment_idx").on(t.appointmentId),
// //   })
// // );

// // export const payments = pgTable(
// //   "payments",
// //   {
// //     id: uuid("id").primaryKey().defaultRandom().notNull(),

// //     invoiceId: uuid("invoice_id")
// //       .notNull()
// //       .references(() => invoices.id, { onDelete: "cascade" }),

// //     provider: paymentProviderEnum("provider").notNull(),
// //     providerPaymentId: varchar("provider_payment_id", { length: 255 }).notNull(),

// //     amountCents: integer("amount_cents").notNull(),
// //     currency: varchar("currency", { length: 10 }).notNull().default("RUB"),
// //     status: paymentStatusEnum("status").notNull().default("pending"),

// //     paidAt: timestamp("paid_at", { withTimezone: true }),

// //     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
// //     updatedAt: timestamp("updated_at", { withTimezone: true })
// //       .notNull()
// //       .defaultNow()
// //       .$onUpdate(() => new Date()),
// //   },
// //   (t) => ({
// //     invoiceIdx: index("payments_invoice_idx").on(t.invoiceId),
// //     providerPaymentIdx: uniqueIndex("payments_provider_payment_id_uniq").on(t.providerPaymentId),
// //   })
// // );

// // /* =========================
// //    NOTIFICATIONS
// // ========================= */

// // export const notifications = pgTable(
// //   "notifications",
// //   {
// //     id: uuid("id").primaryKey().defaultRandom().notNull(),

// //     userId: uuid("user_id")
// //       .notNull()
// //       .references(() => users.id, { onDelete: "cascade" }),

// //     type: notificationTypeEnum("type").notNull(),
// //     title: varchar("title", { length: 255 }).notNull(),
// //     body: text("body").notNull(),
// //     linkUrl: varchar("link_url", { length: 512 }),

// //     readAt: timestamp("read_at", { withTimezone: true }),

// //     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
// //   },
// //   (t) => ({
// //     userIdx: index("notifications_user_idx").on(t.userId),
// //     readIdx: index("notifications_read_idx").on(t.readAt),
// //   })
// // );

// // /* =========================
// //    AUDIT + DOCTOR VERIFICATION
// // ========================= */

// // export const auditLogs = pgTable(
// //   "audit_logs",
// //   {
// //     id: uuid("id").primaryKey().defaultRandom().notNull(),

// //     actorUserId: uuid("actor_user_id")
// //       .notNull()
// //       .references(() => users.id, { onDelete: "restrict" }),

// //     action: varchar("action", { length: 120 }).notNull(),
// //     targetType: varchar("target_type", { length: 120 }).notNull(),
// //     targetId: uuid("target_id").notNull(),

// //     meta: jsonb("meta"),

// //     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
// //   },
// //   (t) => ({
// //     actorIdx: index("audit_logs_actor_idx").on(t.actorUserId),
// //     targetIdx: index("audit_logs_target_idx").on(t.targetType, t.targetId),
// //   })
// // );

// // export const doctorVerificationRequests = pgTable(
// //   "doctor_verification_requests",
// //   {
// //     id: uuid("id").primaryKey().defaultRandom().notNull(),

// //     doctorId: uuid("doctor_id")
// //       .notNull()
// //       .references(() => doctorProfiles.userId, { onDelete: "cascade" }),

// //     submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull().defaultNow(),

// //     documents: jsonb("documents"),
// //     status: doctorVerificationEnum("status").notNull().default("pending"),

// //     reviewedByUserId: uuid("reviewed_by_user_id").references(() => users.id, {
// //       onDelete: "set null",
// //     }),
// //     reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
// //     rejectionReason: text("rejection_reason"),

// //     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
// //     updatedAt: timestamp("updated_at", { withTimezone: true })
// //       .notNull()
// //       .defaultNow()
// //       .$onUpdate(() => new Date()),
// //   },
// //   (t) => ({
// //     doctorIdx: index("doctor_verification_doctor_idx").on(t.doctorId),
// //     reviewerIdx: index("doctor_verification_reviewer_idx").on(t.reviewedByUserId),
// //   })
// // );
