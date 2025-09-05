import { ProductController } from "@/common/product/controller/product.controller";
import { ValidateRequest } from "@/core/middleware/product.middleware";
import express from "express"
import { container } from "tsyringe";
import { ProductItemController } from "@/common/product/controller/productItem.controller";
import { createProductItemSchema, productItemResponseSchema } from "@/common/product/dtos/productItem.schema";

const router = express.Router()

  const productItemController = container.resolve(ProductItemController)

router.post(`/:id/create`,ValidateRequest(createProductItemSchema), productItemController.onCreateProductItem);
router.patch(`/:id/item/:itemId/update`, ValidateRequest(productItemResponseSchema), productItemController.onUpdateProductItem);
router.get(`/:id/item/:itemId`, productItemController.onProductItem);
router.get(`/:id/items`, productItemController.onGetAllProductItems);
router.delete(`/item/:itemId/delete`, productItemController.onDeleteProductItem);

export default router;