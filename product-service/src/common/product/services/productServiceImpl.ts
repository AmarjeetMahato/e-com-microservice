import { db, DbOrTx } from "@/config/db";
import { AlreadyExistsException, BadRequestException } from "@/core/utils/Catch-errors";
import { injectable, inject } from "tsyringe";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.schema";
import { IProductInterface } from "../interface/product.interface";
import axios from "axios";



@injectable()
export class ProductServiceImpl {
  constructor(
    @inject('IProductInterface') private repo: IProductInterface,
    @inject('Db') private db: DbOrTx
  ) {}

  async createProduct(data: CreateProductDto) {

    return await db.transaction(async (tx) => {
      // 1️⃣ Check uniqueness
      const slugExists = await this.repo.productNameAndSlugUnique(data.name, data.slug, tx);
      if (slugExists?.id) throw new AlreadyExistsException(
        `Product name: ${data.name} or slug: ${data.slug} already exists`
      );
        console.log("categoryId ", data.categoryId )
       try {
             const response = await axios.get(
                    `http://category-service:3000/api/v1/category/get-category/${data.categoryId}`,
                   {timeout:3000}
             )
              console.log(response?.data)
             if(!response?.data?.data.id){
                         throw new BadRequestException(`Category ${data.categoryId} not found`);
             }
       } catch (error) {
                  console.log(error)
                  throw new BadRequestException(`Invalid category: ${data.categoryId}`);
       }

      // 2️⃣ Create main product
      const newProduct = await this.repo.createProductOnly(data, tx);
      if (!newProduct?.id) throw new BadRequestException("Product creation failed");

      // 3️⃣ Create items
      if (data.items?.length) {
        await this.repo.createProductItems(newProduct.id, data.items, tx);
      }

      // 4️⃣ Create images
      if (data.images?.length) {
        await this.repo.createProductImages(newProduct.id, data.images, tx);
      }

      // 5️⃣ Return full product with relations
      return await this.repo.getProductWithRelations(newProduct.id, tx);
    }, {
      isolationLevel: "read committed",
      accessMode: "read write",
    });
  }

  async updateProduct(productId: string, data: UpdateProductDto) {
   
      const productExists = await this.repo.getProduct(productId);
      if (!productExists) throw new BadRequestException(`Product not found with this id ${productId}`);

      // Check if name or slug is being updated and is unique
      if (data.name || data.slug) {
        const existingProduct = await this.repo.productNameAndSlugUnique(data.name || productExists.name, data.slug || productExists.slug);
        if (existingProduct && existingProduct.id !== productId) {
          throw new AlreadyExistsException(
            `Product name: ${data.name} or slug: ${data.slug} already exists`
          );
        }
      }
      // Update product
      const updated =  await this.repo.getUpdateProduct(productId, data, db);
      if (!updated?.id) throw new BadRequestException("Product update failed");
      // Return updated product with relations
      return await this.repo.getProductWithRelations(updated.id, db);
  }

  async getProduct(productId: string) {
    if (!productId ) throw new BadRequestException("Product ID is required");
    const product = await this.repo.getProduct(productId);
    if (!product) throw new BadRequestException(`Product not found with this id ${productId}`);
    return product;
  }

  async getAllProducts(limit: number, offset: number) {
    const products = await this.repo.getAllProducts(limit, offset);
    return products;
  }

async getDeleteProduct(productId: string) {
  if (!productId) throw new BadRequestException("Product ID is required");

  return await this.db.transaction(async (tx:DbOrTx) => {
    const product = await this.repo.getDeleteProduct(productId, tx);
    if (!product) throw new BadRequestException(`Product not found with this id ${productId}`);
    return product;
  });
}


}
