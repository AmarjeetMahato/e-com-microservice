import { z } from "zod";

// Common reusable fields
const baseProductItemSchema = {
  sku: z.string().min(1).max(100),
  variantName: z.string().max(150).optional(),
  color: z.string().max(50).optional(),
  storageSize: z.string().max(50).optional(),
  size: z.string().max(20).optional(),

  priceAdjustment: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format") // decimal(10,2)
    .default("0.00"),

  stockQuantity: z.number().int().nonnegative().default(0),
  lowStockThreshold: z.number().int().nonnegative().optional(),
  weightGrams: z.number().int().positive().optional(),
  dimensionsCm: z.string().max(50).optional(),

  status: z.enum(["active", "inactive"]).default("active"),
  isActive: z.boolean().default(true),
  createdBy: z.uuid().optional(),
  updatedBy: z.uuid().optional(),
};

// Create DTO
export const createProductItemSchema = z.object({
  ...baseProductItemSchema,
});

// Update DTO (all optional)
export const updateProductItemSchema = z.object({
  sku: z.string().min(1).max(100).optional(),
  variantName: z.string().max(150).optional(),
  color: z.string().max(50).optional(),
  storageSize: z.string().max(50).optional(),
  size: z.string().max(20).optional(),

  priceAdjustment: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format")
    .optional(),

  stockQuantity: z.number().int().nonnegative().optional(),
  lowStockThreshold: z.number().int().nonnegative().optional(),
  weightGrams: z.number().int().positive().optional(),
  dimensionsCm: z.string().max(50).optional(),

  status: z.enum(["active", "inactive"]).optional(),
  isActive: z.boolean().optional(),
     createdBy: z.uuid().optional(),
    updatedBy: z.uuid().optional(),
});

// Response DTO
export const productItemResponseSchema = z.object({
  id: z.uuid(),
  ...baseProductItemSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
});

// Types
export type CreateProductItemDto = z.infer<typeof createProductItemSchema>;
export type UpdateProductItemDto = z.infer<typeof updateProductItemSchema>;
export type ProductItemResponseDto = z.infer<typeof productItemResponseSchema>;
