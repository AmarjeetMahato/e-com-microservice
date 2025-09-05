import { ICategoryInterface } from "@/common/category/interface/ICategoryInterface";
import { CategoryRepository } from "@/common/category/repository/Category.repository";
import { CategoryServiceImpl } from "@/common/category/service/CategoryServiceImpl";
import { container } from "tsyringe";


container.register<ICategoryInterface>("ICategoryInterface", {
  useClass: CategoryRepository,
});
container.register<CategoryServiceImpl>(CategoryServiceImpl, { useClass: CategoryServiceImpl });
