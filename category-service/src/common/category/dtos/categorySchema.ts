// src/config/schema/category.schema.ts
import { z } from 'zod';

const uuidV4 = z.string().refine(
  (val) => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(val),
  { message: "Invalid UUID v4" }
);


export const CategorySchema = z.object({                   
  catName: z.string().min(1, "Category name is required"), 
  description: z.string().max(500).optional(),            
  slug: z.string().min(1, "Slug is required"),             

  // SEO fields
  metaTitle: z.string().max(160).optional(),
  metaDescription: z.string().max(320).optional(),

  // Display options
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),

  // Media
  imageUrl: z.string().max(500).optional(),
  iconUrl: z.string().max(500).optional(),

 
   createdBy: uuidV4.optional(),
  updatedBy: uuidV4.optional(),
});

// Optional: infer TypeScript type from Zod schema
export type CategoryType = z.infer<typeof CategorySchema>;
