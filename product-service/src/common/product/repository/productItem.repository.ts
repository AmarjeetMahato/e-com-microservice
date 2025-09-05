import { ProductItem, ProductItemRow } from "@/config/schema/productItem.entity";
import { CreateProductItemDto, UpdateProductItemDto } from "../dtos/productItem.schema";
import { IProductItemInterface } from "../interface/productItem.interface";
import { db } from "@/config/db";
import { and, eq, sql } from "drizzle-orm";
import {Product} from "@/config/schema/product.entity";


export class ProductItemRepository  implements IProductItemInterface {


    async createProductItem(productId: string, data: CreateProductItemDto): Promise<ProductItemRow> {
                    
              const [productItem] = await db.insert(ProductItem).values({
                ...data,
                productId,
                createdAt: new Date(),  
                updatedAt: new Date(),
              }).returning();

              return productItem;
    }

    async updateProductItem(productId: string, itemId: string, data: UpdateProductItemDto): Promise<ProductItemRow> {
            const [updatedItem] = await db.update(ProductItem)
                .set({
                ...data,
                updatedAt: new Date(),
                })
                .where(and(eq(ProductItem.id, itemId), eq(ProductItem.productId, productId)))
                .returning();
    
            return updatedItem;
    }

    async getProductItem(productId: string, itemId: string): Promise<ProductItemRow | null> {
          const productItem = await db.query.ProductItem.findFirst({
            where: eq(ProductItem.id, itemId),
            with:{product: true},
            });
            return productItem ?? null;
    }

    async getAllProductItems(productId: string, limit: number, offset: number): Promise<ProductItemRow[]> {
           const allProductItems = await db.query.ProductItem.findMany({
            where: eq(ProductItem.productId, productId),    
            limit,
            offset, 
            with: { product: true },
          });
            return allProductItems;
    }

    async deleteProductItem( itemId: string): Promise<boolean> {
            const result =   await db.delete(ProductItem)
              .where(eq(ProductItem.id, itemId))
                .returning();

             return result.length > 0;   
    }

  async productItemExists(productId: string): Promise<boolean> {
   const result = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(Product)
    .where(eq(Product.id, productId));

  return result[0]?.count > 0;
}

}
