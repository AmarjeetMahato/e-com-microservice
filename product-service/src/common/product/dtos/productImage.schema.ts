import { z } from "zod";


// Base schema (shared fields)
const baseProductImageSchema = {
  productId: z.uuid().optional(), itemId: z.uuid().optional(),

  imageUrl: z.url().max(500),
  altText: z.string().max(200).optional(),
  imageType: z.string().max(50).default("product_main"),

  sortOrder: z.number().int().nonnegative().default(0),
  isPrimary: z.boolean().default(false),

  widthPx: z.number().int().positive().optional(),
  heightPx: z.number().int().positive().optional(),
  fileSizeKb: z.number().int().positive().optional(),

  isActive: z.boolean().default(true),
     createdBy: z.uuid().optional(),
    updatedBy: z.uuid().optional(),
};

// Create DTO
export const createProductImageSchema = z.object({
  ...baseProductImageSchema,
});

// Update DTO (all fields optional)
export const updateProductImageSchema = z.object({
  productId: z.uuid().optional(),
  itemId: z.uuid().optional(),

  imageUrl: z.url().max(500).optional(),
  altText: z.string().max(200).optional(),
  imageType: z.string().max(50).optional(),

  sortOrder: z.number().int().nonnegative().optional(),
  isPrimary: z.boolean().optional(),

  widthPx: z.number().int().positive().optional(),
  heightPx: z.number().int().positive().optional(),
  fileSizeKb: z.number().int().positive().optional(),

  isActive: z.boolean().optional(),
     createdBy:z.uuid().optional(),
    updatedBy: z.uuid().optional(),
});

// Response DTO
export const productImageResponseSchema = z.object({
  id: z.uuid(),
  ...baseProductImageSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

// Types
export type CreateProductImageDto = z.infer<typeof createProductImageSchema>;
export type UpdateProductImageDto = z.infer<typeof updateProductImageSchema>;
export type ProductImageResponseDto = z.infer<typeof productImageResponseSchema>;
