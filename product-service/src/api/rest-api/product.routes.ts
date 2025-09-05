import { ProductController } from "@/common/product/controller/product.controller";
import { ValidateRequest } from "@/core/middleware/product.middleware";
import express from "express"
import { container } from "tsyringe";
import {createProductSchema, updateProductSchema} from "@/common/product/dtos/product.schema";

const router = express.Router()

  const productController = container.resolve(ProductController)

router.post(`/create`,ValidateRequest(createProductSchema), productController.onCreateProduct)
router.get(`/fetchAll`, productController.getAllProducts);
router.patch(`/:id/update`,ValidateRequest(updateProductSchema), productController.onUpdateProduct);
router.get(`/:id`, productController.getProduct);
router.delete(`/:id/delete`, productController.getDeleteProduct);

export default router;