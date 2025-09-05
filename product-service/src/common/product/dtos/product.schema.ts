import {  z } from "zod";
import { createProductImageSchema } from "./productImage.schema";
import { createProductItemSchema } from "./productItem.schema";


// Common fields
const baseProductSchema = {
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  categoryId: z.uuid(),
  brand: z.string().max(100).optional(),
  basePrice: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"), // decimal(10,2)
  currency: z.string().length(3).default("USD"),

  metaTitle: z.string().max(160).optional(),
  metaDescription: z.string().max(320).optional(),
  slug: z.string().min(1).max(200),

  status: z.enum(["active", "inactive"]).default("active"),
  isActive: z.boolean().default(true),
  
   createdBy: z.uuid().optional(),
  updatedBy: z.uuid().optional(),
};

// Create DTO
export const createProductSchema = z.object({
  ...baseProductSchema,
  items: z.array(createProductItemSchema).optional(),
  images: z.array(createProductImageSchema).optional(),
});

// Update DTO (all fields optional)
export const updateProductSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  brand: z.string().max(100).optional(),
  basePrice: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format").optional(),
  currency: z.string().length(3).optional(),

  metaTitle: z.string().max(160).optional(),
  metaDescription: z.string().max(320).optional(),
  slug: z.string().min(1).max(200).optional(),

  status: z.enum(["active", "inactive"]).optional(),
  isActive: z.boolean().optional(),
     createdBy: z.uuid().optional(),
  updatedBy: z.uuid().optional(),
});

// Response DTO
export const productResponseSchema = z.object({
  id: z.uuid(),
  ...baseProductSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
});

// Types
export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
export type ProductResponseDto = z.infer<typeof productResponseSchema>;
