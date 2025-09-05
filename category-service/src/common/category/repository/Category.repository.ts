import { Category, CategoryRow } from "@/config/schema/category.entity";
import { CategoryType } from "../dtos/categorySchema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { ICategoryInterface } from "../interface/ICategoryInterface";


export class CategoryRepository implements ICategoryInterface{

  async  getCategoryBySlug(slug: String): Promise<CategoryRow | null> {
         const [fetchCategory] = await db.select().from(Category)
                                         .where(eq(sql`${Category.slug}`, slug))
        return fetchCategory ?? null;    }

   async  updateCategory(catId: string,  data: Partial<CategoryType>): Promise<CategoryRow> {
         const [updatedData] = await db.update(Category).set({
               ...data,
               updatedAt: new Date()
         }).where(eq(Category.id,catId))
         .returning()

         return updatedData;
    }


    async createCategory(data:CategoryType): Promise<CategoryRow> {
         const [inserted] = await db.insert(Category)
                                    .values(data)
                                    .returning()
         return inserted;                           
    }

    
    async getCategory(catId: String): Promise<CategoryRow | null> {
        const [fetchCategory] = await db.select().from(Category)
                                         .where(eq(sql`${Category.id}`, catId))
        return fetchCategory ?? null;
    }
    
    async getAllCategory(limit: number, offset: number): Promise<CategoryRow[]> {
    return await db.select()
        .from(Category)
        .limit(limit)
        .offset(offset);
}

async deleteCategory(catId: string): Promise<number> {
   const result =  await db.delete(Category)
        .where(eq(Category.id, catId));

    return result.rowCount ?? 0;
}

}