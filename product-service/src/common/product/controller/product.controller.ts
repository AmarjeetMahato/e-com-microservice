import { inject, injectable } from "tsyringe";
import { ProductServiceImpl } from "../services/productServiceImpl";
import { NextFunction, Request, Response } from "express";
import { HTTPSTATUS } from "@/core/utils/https.config";

@injectable()
export class ProductController {
  constructor(
    @inject(ProductServiceImpl) private service: ProductServiceImpl
  ) {}

  onCreateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    try {
      const product = await this.service.createProduct(data);
      res.status(HTTPSTATUS.CREATED).json({
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  onUpdateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const data = req.body;
    try {
      const updatedProduct = await this.service.updateProduct(productId, data);
      res.status(HTTPSTATUS.OK).json({
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  };

  getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id: productId } = req.params;
    try {
      const product = await this.service.getProduct(productId);

      res.status(HTTPSTATUS.OK).json({
        message: "Product retrieved successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
     const limit = Number(req.query.limit) || 10;
     const offset = Number(req.query.offset) || 0;

     try {
      const products = await this.service.getAllProducts(
        Number(limit),
        Number(offset)
      );

      if (!products.length) {
  return res.status(HTTPSTATUS.OK).json({
    message: "No products found",
    data: []
  });
}

      res.status(HTTPSTATUS.OK).json({
        message: "Products retrieved successfully",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  getDeleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const productId = req.params.id;
    try {
      const deletedProduct = await this.service.getDeleteProduct(productId);
      res.status(HTTPSTATUS.NO_CONTENT).json({
        message: "Product deleted successfully",
        data: deletedProduct,
      });
    } catch (error) {
      next(error);
    }
  };
}
