CREATE TYPE "public"."record_visibility_enum" AS ENUM('private', 'appointment_only', 'shared');--> statement-breakpoint
CREATE TABLE "record_shares" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"record_id" uuid NOT NULL,
	"patient_id" uuid NOT NULL,
	"shared_by_user_id" uuid NOT NULL,
	"shared_with_user_id" uuid NOT NULL,
	"reason" "record_share_reason_enum" DEFAULT 'patient_shared' NOT NULL,
	"note" text,
	"expires_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "medical_records" ADD COLUMN "visibility" "record_visibility_enum" DEFAULT 'appointment_only' NOT NULL;--> statement-breakpoint
ALTER TABLE "record_shares" ADD CONSTRAINT "record_shares_record_id_medical_records_id_fk" FOREIGN KEY ("record_id") REFERENCES "public"."medical_records"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "record_shares" ADD CONSTRAINT "record_shares_patient_id_patient_profiles_user_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient_profiles"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "record_shares" ADD CONSTRAINT "record_shares_shared_by_user_id_users_id_fk" FOREIGN KEY ("shared_by_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "record_shares" ADD CONSTRAINT "record_shares_shared_with_user_id_users_id_fk" FOREIGN KEY ("shared_with_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "record_shares_record_idx" ON "record_shares" USING btree ("record_id");--> statement-breakpoint
CREATE INDEX "record_shares_target_idx" ON "record_shares" USING btree ("shared_with_user_id");--> statement-breakpoint
CREATE INDEX "record_shares_active_idx" ON "record_shares" USING btree ("shared_with_user_id","revoked_at");--> statement-breakpoint
CREATE UNIQUE INDEX "record_shares_uniq" ON "record_shares" USING btree ("record_id","shared_with_user_id");