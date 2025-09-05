import { ProductRow } from "@/config/schema/product.entity";
import { ProductItemRow } from "@/config/schema/productItem.entity";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.schema";
import { DbOrTx } from "@/config/db"; // db or transaction
import { ProductImageRow } from "@/config/schema/productImage.entity";

export type ProductWithRelations = ProductRow & {
  items: ProductItemRow[];
  images: ProductImageRow[];
};

export interface IProductInterface {
  // Core Product
  createProductOnly(data: CreateProductDto, tx?: DbOrTx): Promise<ProductRow>;
  getProduct(productId: string, tx?: DbOrTx): Promise<ProductRow | null>;
  getAllProducts(limit: number, offset: number, tx?: DbOrTx): Promise<ProductWithRelations[] | []>;
  getUpdateProduct(productId: string, data: UpdateProductDto, tx?: DbOrTx): Promise<ProductRow>;
  getDeleteProduct(productId: string, tx?: DbOrTx): Promise<ProductRow | null>;

  // Product Items
  createProductItems(productId: string, items: CreateProductDto["items"], tx?: DbOrTx): Promise<void>;

  // Product Images
  createProductImages(productId: string, images: CreateProductDto["images"], tx?: DbOrTx): Promise<void>;

  // Validation
  productNameAndSlugUnique(productName: string, slug: string, tx?: DbOrTx): Promise<ProductRow | null>;

  // Get full product with relations
  getProductWithRelations(productId: string, tx?: DbOrTx): Promise<ProductRow | null>;
}
