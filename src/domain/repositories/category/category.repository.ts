import { CreateCategoryDto } from "../../dtos";
import { CategoryEntity } from "../../entities/category.entity";


export abstract class CategoryRepository{

    abstract getCategoryId(id: string):Promise<CategoryEntity | null>;
    abstract getAllCategory():Promise<CategoryEntity[] | null>;
    abstract createCategory(createCategoryDto: CreateCategoryDto):Promise<CategoryEntity | null>;
    abstract updateCategory(id: string,createCategoryDto: CreateCategoryDto):Promise<CategoryEntity | null>;
    abstract deleteCategory(id: string):Promise<boolean>;

}