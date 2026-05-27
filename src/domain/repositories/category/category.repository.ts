import { CategoryEntity } from "../../entities/category.entity";


export abstract class CategoryRepository{

    abstract getById(id: string):Promise<CategoryEntity | null>;
    abstract getAll():Promise<CategoryEntity[]>;
    abstract create(category: CategoryEntity):Promise<CategoryEntity | null>;
    abstract update(id: string,category: CategoryEntity):Promise<CategoryEntity | null>;
    abstract delete(id: string):Promise<boolean>;

}