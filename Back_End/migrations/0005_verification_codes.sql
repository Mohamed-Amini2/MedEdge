CREATE TABLE IF NOT EXISTS "verification_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"code" varchar(64) NOT NULL,
	"expired_at" timestamp NOT NULL,
	"used" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now()
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_codes_email_idx" ON "verification_codes" USING btree ("email");
