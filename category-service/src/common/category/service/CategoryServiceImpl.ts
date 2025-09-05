import { inject, injectable } from "tsyringe";
import { CategoryType } from "../dtos/categorySchema";
import { AlreadyExistsException, NotFoundException } from "@/core/utils/Catch-error";
import { ICategoryInterface } from "../interface/ICategoryInterface";
import redis from "@/config/redis/redis";

@injectable()
export class CategoryServiceImpl {
  constructor(@inject("ICategoryInterface") private repo: ICategoryInterface) {}

  async createCategory(data: CategoryType) {

     const slugCategory =  await this.repo.getCategoryBySlug(data.slug);
     if(slugCategory){
         throw new AlreadyExistsException(`Slug must be unique:- ${data.slug}`)
     } 
    
    const category = await this.repo.createCategory(data);
    if (!category.id) {
      throw new NotFoundException();
    }

    const cacheCategoryDetails = {
        id: category.id,
        name: category.catName
    }

     await redis.set(`category:${category.id}`, JSON.stringify(cacheCategoryDetails))
    return category;
  }

  async getCategory(catId: string) {
    const cacheCategory = await redis.get(`category:${catId}`)
    if(cacheCategory){
       return JSON.parse(cacheCategory);
    }

    const category = await this.repo.getCategory(catId);
    if (!category?.id) {
      throw new NotFoundException(`category with Id ${catId} not found`);
    }

      const cacheCategoryDetails = {
    id: category.id,
    name: category.catName
  };
    await redis.set(`category:${category.id}`, JSON.stringify(cacheCategoryDetails));

    return category;
  }

  async getAllCategory(limit: number, offset: number){
          const allCategory = await this.repo.getAllCategory(limit,offset)
          if(!allCategory){
                throw new NotFoundException(`No category found`)
          }

          return allCategory
  }


  async updateCategory(
    catId: string,
    data: Partial<CategoryType>
  ) {
    const existingCategory = await this.repo.getCategory(catId);
    if (!existingCategory?.id) {
      throw new NotFoundException(`Category with ID ${catId} not found`);
    }

    const updated = await this.repo.updateCategory(catId, data);
    if (!updated) {
      throw new NotFoundException(`Failed to update category with ID ${catId}`);
    }

    return updated;
  }

  async deleteCategory(catId: string) {
    const categoryDelete = await this.repo.deleteCategory(catId);

    if (categoryDelete == 0) {
      throw new NotFoundException(`Category with ID ${catId} not found`);
    }

    await redis.del(`category:${catId}`)
    return categoryDelete;
  }


}
