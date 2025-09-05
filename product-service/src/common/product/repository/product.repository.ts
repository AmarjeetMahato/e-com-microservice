import { Product, ProductRow } from "@/config/schema/product.entity";
import { ProductImage } from "@/config/schema/productImage.entity";
import { ProductItem } from "@/config/schema/productItem.entity";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.schema";
import {
  IProductInterface,
  ProductWithRelations,
} from "../interface/product.interface";
import { db } from "@/config/db";
import type { DbOrTx, DrizzleDb } from "@/config/db"; // ✅ Correct
import { eq, or } from "drizzle-orm";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProductRepository implements IProductInterface {
  constructor(@inject("Db") private db: DbOrTx) {}

  async getAllProducts(
    limit: number,
    offset: number,
    tx?: DbOrTx
  ): Promise<ProductWithRelations[] | []> {
    const executor = tx ?? db; // always pick either transaction or global db
    return await executor?.query.Product.findMany({
      limit,
      offset,
      orderBy: (p, { desc }) => [desc(p.createdAt)],
      with: {
        items: true,
        images: true,
      },
    });
  }

  async getProduct(productId: string, tx?: DbOrTx): Promise<ProductRow | null> {
    let dbOrTx = tx || db;
    const product = await dbOrTx.query.Product.findFirst({
      where: eq(Product.id, productId),
      with: { items: true, images: true },
    });
    return product ?? null;
  }

  async getUpdateProduct(
    productId: string,
    data: UpdateProductDto,
    tx?: DbOrTx
  ): Promise<ProductRow> {
    const executor = tx ?? db; // tx if exists, else global db
    if (!executor) throw new Error("Database connection is not initialized");

    const [updated] = await executor
      .update(Product)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(Product.id, productId))
      .returning();
    return updated;
  }

  async getDeleteProduct(
    productId: string,
    tx?: DbOrTx
  ): Promise<ProductRow | null> {
    const db = tx ?? this.db; // use transaction if provided

    // Step 1: Delete related images
    await db.delete(ProductImage).where(eq(ProductImage.productId, productId));

    // Step 2: Delete related items
    await db.delete(ProductItem).where(eq(ProductItem.productId, productId));

    // Step 3: Delete product itself (and return deleted row)
    const [deletedProduct] = await db
      .delete(Product)
      .where(eq(Product.id, productId))
      .returning();

    return deletedProduct ?? null;
  }

  async createProductOnly(
    data: CreateProductDto,
    tx: DbOrTx
  ): Promise<ProductRow> {
    const [newProduct] = await tx
      .insert(Product)
      .values({
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        brand: data.brand,
        basePrice: data.basePrice,
        currency: data.currency,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        slug: data.slug,
        status: data.status,
        isActive: data.isActive,
      })
      .returning();

    return newProduct;
  }

  async createProductItems(
    productId: string,
    items: CreateProductDto["items"],
    tx: DbOrTx
  ): Promise<void> {
    if (!items?.length) return;
    await tx
      .insert(ProductItem)
      .values(items.map((i) => ({ ...i, productId })));
  }

  async createProductImages(
    productId: string,
    images: CreateProductDto["images"],
    tx: DbOrTx
  ): Promise<void> {
    if (!images?.length) return;
    await tx
      .insert(ProductImage)
      .values(images.map((img) => ({ ...img, productId })));
  }

  async productNameAndSlugUnique(
    productName: string,
    slug: string,
    tx: DbOrTx
  ): Promise<ProductRow | null> {
        const executor = tx ?? db; // tx if exists, else global db
    if (!executor) throw new Error("Database connection is not initialized");
   
    const [fetchProduct] = await executor
      .select()
      .from(Product)
      .where(or(eq(Product.name, productName), eq(Product.slug, slug)));
    return fetchProduct ?? null;
  }

  async getProductWithRelations(
    productId: string,
    tx: DbOrTx
  ): Promise<ProductRow | null> {
    return (
      (await tx.query.Product.findFirst({
        where: eq(Product.id, productId),
        with: { items: true, images: true },
      })) ?? null
    );
  }
}
