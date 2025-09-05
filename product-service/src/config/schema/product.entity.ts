import { pgTable, uuid, varchar, timestamp, boolean, decimal, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { ProductItem } from './productItem.entity';
import { ProductImage } from './productImage.entity';

export const Product = pgTable('product', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 200 }).notNull().unique(),
  description: text('description'),
  categoryId: uuid('categoryId').notNull(),
  brand: varchar('brand', { length: 100 }),
  basePrice: decimal('basePrice', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD').notNull(),

  // SEO
  metaTitle: varchar('metaTitle', { length: 160 }),
  metaDescription: varchar('metaDescription', { length: 320 }),
  slug: varchar('slug', { length: 200 }).notNull().unique(),

  status: varchar('status', { length: 20 }).default('active').notNull(),
  isActive: boolean('isActive').default(true).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  createdBy: uuid('createdBy'),
  updatedBy: uuid('updatedBy'),
});

export const productRelations = relations(Product, ({ many }) => ({
  items: many(ProductItem),
  images: many(ProductImage),
}));


export  type ProductRow = typeof Product.$inferSelect;
