import { CategoryRow } from "@/config/schema/category.entity";
import { CategoryType } from "../dtos/categorySchema";



export interface ICategoryInterface {

    createCategory(data:CategoryType):Promise<CategoryRow> 
    getCategory(catId:String):Promise<CategoryRow | null>;
    getCategoryBySlug(slug:String):Promise<CategoryRow | null>;
    getAllCategory(limit:number,offset:number):Promise<CategoryRow[]>
    deleteCategory(catId:string): Promise<number>;
    updateCategory(catId: string, data: Partial<CategoryType>): Promise<CategoryRow>;
}