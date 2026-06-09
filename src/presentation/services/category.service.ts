import { AppDataSource } from "../../data/data-source";
import { CategoryModel } from "../../data/models/category.model";
import { AbleCategoryUseCase, CreateCategoryDto, CreateCategoryUseCase, DisableCategoryUseCase,  GetAllCategoriesUseCase,  GetCategoryIdUseCase, GetCategoryNameUseCase, UpdateCategoryDto, UpdateCategoryUseCase,  } from "../../domain";
import { CategoryDatasourceImpl, CategoryRepositoryImpl } from "../../infrastructure";



export class CategoryService{
    private readonly categoryDatasource = new CategoryDatasourceImpl(
            AppDataSource.getRepository(CategoryModel)
    );
    private readonly categoryRepository = new CategoryRepositoryImpl(this.categoryDatasource);
    

    constructor(){
        
    }

    async getAll(){
        const categories = new GetAllCategoriesUseCase(this.categoryRepository);
        return await categories.execute();
    }

    async getById(id: string){
        const category = new GetCategoryIdUseCase(this.categoryRepository);
        return await category.execute(id);
    }

    async getByName(name: string){
        const category = new GetCategoryNameUseCase(this.categoryRepository);
        return await category.execute(name);
    }

    async create(dto: CreateCategoryDto){
        const create = new CreateCategoryUseCase(this.categoryRepository);
        return await create.execute(dto);
    }

    async update(id: string, dto: UpdateCategoryDto){
        const update = new UpdateCategoryUseCase(this.categoryRepository);
        return await update.execute(id,dto)
    }

    async able(id: string){
        const enable = new AbleCategoryUseCase(this.categoryRepository);
        return await enable.execute(id);
    }
    
    async disable(id: string){
        const disable = new DisableCategoryUseCase(this.categoryRepository);
        return await disable.execute(id);
    }



}