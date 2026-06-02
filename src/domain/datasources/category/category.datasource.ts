import { CategoryEntity } from "../../entities/category.entity";



export abstract class CategoryDatasource{

    abstract getById(id: string):Promise<CategoryEntity | null>;
    abstract getAll():Promise<CategoryEntity[]>;
    abstract getByName(name: string):Promise<CategoryEntity | null>;
    abstract create(category: CategoryEntity):Promise<CategoryEntity | null>;
    abstract update(id: string,category: CategoryEntity):Promise<CategoryEntity | null>;

}