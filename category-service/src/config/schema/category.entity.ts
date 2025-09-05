// src/config/schema/category.entity.ts
import { pgTable, uuid, varchar, timestamp, boolean, integer, index } from 'drizzle-orm/pg-core';

export const  Category = pgTable('category', {
  id: uuid('id').defaultRandom().primaryKey(),
  catName: varchar('catName', { length: 100 }).notNull(),
  description: varchar('description', { length: 500 }),
  slug: varchar('slug', { length: 100 }).notNull().unique(),

  // SEO fields
  metaTitle: varchar('metaTitle', { length: 160 }),
  metaDescription: varchar('metaDescription', { length: 320 }),

  // Display options
  isActive: boolean('isActive').default(true).notNull(),
  sortOrder: integer('sortOrder').default(0).notNull(),

  // Media
  imageUrl: varchar('imageUrl', { length: 500 }),
  iconUrl: varchar('iconUrl', { length: 500 }),

  // Audit fields
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdBy: uuid('createdBy'),
  updatedBy: uuid('updatedBy'),
});



export  type CategoryRow = typeof Category.$inferSelect;
