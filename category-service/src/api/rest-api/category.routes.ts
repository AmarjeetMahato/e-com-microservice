import { CategoryController } from "@/common/category/controller/Category.controller";
import { CategorySchema } from "@/common/category/dtos/categorySchema";
import { ValidateRequest } from "@/core/middleware/category.middleware";
import express from "express"
import { container } from "tsyringe";




const router = express.Router();

const categoryController = container.resolve(CategoryController)

router.post("/create",ValidateRequest(CategorySchema),categoryController.onCreateCategory);
router.get("/get-category/:id",categoryController.onGetCategory)
router.get("/get-all-category", categoryController.getAllCategory)
router.patch("/:id/update", categoryController.onUpdateCategory)
router.delete("/:id/delete", categoryController.onDeleteCategory)

export default router;