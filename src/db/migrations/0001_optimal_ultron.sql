CREATE TABLE IF NOT EXISTS "item" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"description" varchar(255) NOT NULL,
	"price" integer NOT NULL,
	"code" varchar(255) NOT NULL,
	CONSTRAINT "item_code_unique" UNIQUE("code")
);
