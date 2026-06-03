import { CategoryDatasource, CategoryEntity, CategoryRepository } from "../../../domain";


export class CategoryRepositoryImpl implements CategoryRepository{
    
    constructor(private readonly datasource: CategoryDatasource){}
    
    getById(id: string): Promise<CategoryEntity | null> {
        return this.datasource.getById(id);
    }
    getAll(): Promise<CategoryEntity[]> {
        return this.datasource.getAll();
    }
    getByName(name: string): Promise<CategoryEntity | null> {
        return this.datasource.getByName(name);
    }
    create(category: CategoryEntity): Promise<CategoryEntity | null> {
        return this.datasource.create(category);
    }
    update(id: string, category: CategoryEntity): Promise<CategoryEntity | null> {
        return this.datasource.update(id, category);
    }

}