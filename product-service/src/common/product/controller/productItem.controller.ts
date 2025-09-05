import { inject, injectable } from "tsyringe";
import { ProductItemServiceImpl } from "../services/productItemServiceImpl";
import { NextFunction, Request, Response } from "express";
import { HTTPSTATUS } from "@/core/utils/https.config";





@injectable()
export class ProductItemController {

    constructor(
        @inject('ProductItemServiceImpl') private productItemService: ProductItemServiceImpl
    ) {}

    onCreateProductItem = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
           const body = req.body;
           const {id:productId} = req.params;
         
           try {
                const productItem = await this.productItemService.createProductItem(productId, body);
                res.status(HTTPSTATUS.CREATED).json({
                message: "Product item created successfully",
                data: productItem,
                });
           } catch (error) {
             next(error);
           }
    }


    onUpdateProductItem = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
        const body = req.body;
        const productId = req.params.id;
        const itemId = req.params.itemId;
        try {
            const updatedItem = await this.productItemService.updateProductItem(productId, itemId, body);
            res.status(HTTPSTATUS.OK).json({
                message: "Product item updated successfully",
                data: updatedItem,
            });
        } catch (error) {
            next(error);
        }
    }

    onProductItem = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
        const productId = req.params.id;
        const itemId = req.params.itemId;
        try {
            const productItem = await this.productItemService.getProductItem(productId, itemId);
            res.status(HTTPSTATUS.OK).json({
                message: "Product item retrieved successfully",
                data: productItem,
            });
        } catch (error) {
            next(error);
        }
    }  

    onGetAllProductItems = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
        const productId = req.params.id;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = parseInt(req.query.offset as string) || 0;
        try {
            const productItems = await this.productItemService.getAllProductItems(productId, limit, offset);
            res.status(HTTPSTATUS.OK).json({
                message: "Product items retrieved successfully",
                data: productItems,
            });
        } catch (error) {
            next(error);
        }
        }

    onDeleteProductItem = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
        const {itemId:itemId} = req.params;
        try {
            const deletedItem = await this.productItemService.deleteProductItem(itemId);
            res.status(HTTPSTATUS.NO_CONTENT).json({
                message: "Product item deleted successfully",
                data: deletedItem,
            });
        } catch (error) {
            next(error);
        }
    }       



 
}