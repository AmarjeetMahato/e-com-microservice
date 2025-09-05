
import { ProductItemRow } from "@/config/schema/productItem.entity";
import { CreateProductItemDto,UpdateProductItemDto } from "../dtos/productItem.schema";

export interface IProductItemInterface{
     
        createProductItem(productId: string, data: CreateProductItemDto): Promise<ProductItemRow>;
        updateProductItem(productId: string, itemId: string, data: UpdateProductItemDto): Promise<ProductItemRow>;
        getProductItem(productId: string, itemId: string): Promise<ProductItemRow | null>;
        getAllProductItems(productId: string, limit: number, offset: number): Promise<ProductItemRow[]>;
        deleteProductItem( itemId: string): Promise<boolean>;
        productItemExists(productId: string): Promise<boolean>; 
}