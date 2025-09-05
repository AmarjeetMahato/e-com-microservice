import { pgTable, uuid, varchar, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Product } from './product.entity';
import { ProductItem } from './productItem.entity';

export const ProductImage = pgTable('product_image', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('productId').references(() => Product.id).notNull(),
  itemId: uuid('itemId').references(() => ProductItem.id),

  imageUrl: varchar('imageUrl', { length: 500 }).notNull(),
  altText: varchar('altText', { length: 200 }),
  imageType: varchar('imageType', { length: 50 }).default('product_main').notNull(),
  sortOrder: integer('sortOrder').default(0).notNull(),
  isPrimary: boolean('isPrimary').default(false).notNull(),

  widthPx: integer('widthPx'),
  heightPx: integer('heightPx'),
  fileSizeKb: integer('fileSizeKb'),

  isActive: boolean('isActive').default(true).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
    createdBy: uuid('createdBy'),
    updatedBy: uuid('updatedBy'),
});

// Relations
export const productImageRelations = relations(ProductImage, ({ one }) => ({
  product: one(Product, {
    fields: [ProductImage.productId],
    references: [Product.id],
  }),
  item: one(ProductItem, {
    fields: [ProductImage.itemId],
    references: [ProductItem.id],
  }),
}));


export  type ProductImageRow = typeof ProductImage.$inferSelect;
