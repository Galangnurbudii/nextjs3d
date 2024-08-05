ALTER TABLE "user" ALTER COLUMN "create_time" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "name" varchar(255) NOT NULL;