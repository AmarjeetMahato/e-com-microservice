CREATE TABLE "product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"categoryId" uuid NOT NULL,
	"brand" varchar(100),
	"basePrice" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"metaTitle" varchar(160),
	"metaDescription" varchar(320),
	"slug" varchar(200) NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" uuid,
	"updatedBy" uuid,
	CONSTRAINT "product_name_unique" UNIQUE("name"),
	CONSTRAINT "product_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "product_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"productId" uuid NOT NULL,
	"itemId" uuid,
	"imageUrl" varchar(500) NOT NULL,
	"altText" varchar(200),
	"imageType" varchar(50) DEFAULT 'product_main' NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"isPrimary" boolean DEFAULT false NOT NULL,
	"widthPx" integer,
	"heightPx" integer,
	"fileSizeKb" integer,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" uuid,
	"updatedBy" uuid
);
--> statement-breakpoint
CREATE TABLE "product_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"productId" uuid NOT NULL,
	"sku" varchar(100) NOT NULL,
	"variantName" varchar(150),
	"color" varchar(50),
	"storageSize" varchar(50),
	"size" varchar(20),
	"priceAdjustment" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"stockQuantity" integer DEFAULT 0 NOT NULL,
	"lowStockThreshold" integer DEFAULT 10,
	"weightGrams" integer,
	"dimensionsCm" varchar(50),
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" uuid,
	"updatedBy" uuid,
	CONSTRAINT "product_item_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_itemId_product_item_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."product_item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_item" ADD CONSTRAINT "product_item_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;