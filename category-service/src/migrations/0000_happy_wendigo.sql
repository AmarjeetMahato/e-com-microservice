CREATE TABLE "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"catName" varchar(100) NOT NULL,
	"description" varchar(500),
	"slug" varchar(100) NOT NULL,
	"metaTitle" varchar(160),
	"metaDescription" varchar(320),
	"isActive" boolean DEFAULT true NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"imageUrl" varchar(500),
	"iconUrl" varchar(500),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" uuid,
	"updatedBy" uuid,
	CONSTRAINT "category_slug_unique" UNIQUE("slug")
);
