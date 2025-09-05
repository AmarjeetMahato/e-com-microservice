import { autoInjectable, inject, injectable } from "tsyringe";
import { CategoryServiceImpl } from "../service/CategoryServiceImpl";
import { NextFunction, Request, Response } from "express";
import { HTTPSTATUS } from "@/core/utils/https.config";

@injectable()
export class CategoryController {
  constructor(
    @inject(CategoryServiceImpl) private service: CategoryServiceImpl
  ) {}

  onCreateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!this.service) throw new Error("Service not initialized");

    try {
      const createCategory = await this.service.createCategory(req.body);
      res.status(HTTPSTATUS.CREATED).json({
        message: "Created category",
        data: createCategory,
      });
    } catch (error) {
      next(error);
    }
  };

  onGetCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id: catId } = req.params;
      const category = await this.service.getCategory(catId);
      res
        .status(HTTPSTATUS.OK)
        .json({ message: "Product fetch Successfully", data: category });
    } catch (error) {
      next(error);
    }
  };

 getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Parse pagination parameters from query string
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const offset = parseInt(req.query.offset as string, 10) || 0;

    // Call service layer
    const categories = await this.service.getAllCategory(limit, offset);

    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

onUpdateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id: catId } = req.params;
      const data = req.body;

      const updateCategory = await this.service.updateCategory(catId,data);
      res
        .status(HTTPSTATUS.OK)
        .json({ message: "Product updated Successfully" , data:updateCategory });
    } catch (error) {
      next(error);
    }
  };


onDeleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id: catId } = req.params;
      const category = await this.service.deleteCategory(catId);
      res
        .status(HTTPSTATUS.NO_CONTENT)
        .json({ message: "Product Deleted Successfully" });
    } catch (error) {
      next(error);
    }
  };
}
