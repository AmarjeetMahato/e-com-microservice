import { DbOrTx } from "@/config/db";
import { ProductItemRow } from "@/config/schema/productItem.entity";
import { inject, injectable } from "tsyringe";
import { CreateProductItemDto, UpdateProductItemDto } from "../dtos/productItem.schema";
import { IProductItemInterface } from "../interface/productItem.interface";
import { BadRequestException } from "@/core/utils/Catch-errors";




@injectable()
export class ProductItemServiceImpl {

    constructor(@inject('IProductItemInterface') private repo: IProductItemInterface,) {}
                
    // Implement the methods defined in the interface
    async createProductItem(productId: string, data: CreateProductItemDto){
         if (!productId || !data) {
            throw new BadRequestException("Product ID and data are required");
        }
        // Check if product exists
          const productExists = await this.repo.productItemExists(productId);
          if (!productExists) {
            throw new BadRequestException(`Product with ID ${productId} does not exist`);
          }
          const productItem = await this.repo.createProductItem(productId, data);
          if(!productItem.id){
              throw new BadRequestException("Product item creation failed");
          }

          return productItem;
    }

    async updateProductItem(productId: string, itemId: string, data: UpdateProductItemDto){
        if (!productId || !itemId || !data) {
            throw new BadRequestException("Product ID, Item ID and data are required");
        }
        // Check if product item exists
        const productItemExists = await this.repo.productItemExists(productId);
        if (!productItemExists) {
            throw new BadRequestException(`Product item with ID ${itemId} does not exist for product ${productId}`);
        }
        const updatedItem = await this.repo.updateProductItem(productId, itemId, data);
        if(!updatedItem.id){
            throw new BadRequestException("Product item update failed");
        }
        return updatedItem;
    }

    async getProductItem(productId: string, itemId: string) {
        const productItem = await this.repo.getProductItem(productId, itemId);
        if (!productItem) {
            throw new BadRequestException(`Product item with ID ${itemId} does not exist for product ${productId}`);
        }
        return productItem;
    }

    async getAllProductItems(productId: string, limit: number, offset: number){
        if (!productId) {
            throw new BadRequestException("Product ID is required");
        }
        const productItems = await this.repo.getAllProductItems(productId, limit, offset);
        if (!productItems.length) {
            throw new BadRequestException(`No product items found for product ${productId}`);
        }
        return productItems;
    }

    async deleteProductItem( itemId: string){
         if (!itemId) {
            throw new BadRequestException("Item ID is required");
         }
        const deletedItem = await this.repo.deleteProductItem(itemId);
        if (!deletedItem) {
            throw new BadRequestException(`Product item with ID ${itemId} does not exist`);
        }   
        return deletedItem; 
    }

    async productItemExists(productId: string, itemId: string) {
      if(!productId || !itemId) {
            throw new BadRequestException("Product ID and Item ID are required");
        }
        const productItem =  await this.repo.productItemExists(productId);    
        if(!productItem) {
            throw new BadRequestException(`Product item with ID ${itemId} does not exist for product ${productId}`);
        }
        return productItem;
}

}