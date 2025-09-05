import { pgTable, uuid, varchar, timestamp, boolean, integer, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Product } from './product.entity';
import { ProductImage } from './productImage.entity';

export const ProductItem = pgTable('product_item', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('productId').references(() => Product.id).notNull(),
  sku: varchar('sku', { length: 100 }).notNull().unique(),
  variantName: varchar('variantName', { length: 150 }),
  color: varchar('color', { length: 50 }),
  storageSize: varchar('storageSize', { length: 50 }),
  size: varchar('size', { length: 20 }),

  priceAdjustment: decimal('priceAdjustment', { precision: 10, scale: 2 }).default('0.00').notNull(),
  stockQuantity: integer('stockQuantity').default(0).notNull(),
  lowStockThreshold: integer('lowStockThreshold').default(10),
  weightGrams: integer('weightGrams'),
  dimensionsCm: varchar('dimensionsCm', { length: 50 }),

  status: varchar('status', { length: 20 }).default('active').notNull(),
  isActive: boolean('isActive').default(true).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
    createdBy: uuid('createdBy'),
  updatedBy: uuid('updatedBy'),
});

// Relations
export const productItemRelations = relations(ProductItem, ({ one, many }) => ({
  product: one(Product, {
    fields: [ProductItem.productId],
    references: [Product.id],
  }),
  images: many(ProductImage),
}));


export  type ProductItemRow = typeof ProductItem.$inferSelect;
