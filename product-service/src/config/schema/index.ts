// src/config/schema/index.ts
import { Product,productRelations } from "./product.entity";
import { ProductItem,productItemRelations } from "./productItem.entity";
import { ProductImage,productImageRelations } from "./productImage.entity";

export const schema = {
  Product,
  ProductItem,
  ProductImage,
  productRelations,
  productItemRelations,
  productImageRelations
};
