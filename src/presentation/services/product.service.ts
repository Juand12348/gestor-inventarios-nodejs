import { AppDataSource } from "../../data/data-source";
import { CategoryModel } from "../../data/models/category.model";
import { ProductModel } from "../../data/models/product.model";
import { AbleProductUseCase, CreateProductDto, CreateProductUseCase, DisableProductUseCase, GetAllProductsUseCase, GetProductIdUseCase, GetProductNameUseCase, UpdateProductDto, UpdateProductUseCase } from "../../domain";
import { CategoryDatasourceImpl, CategoryRepositoryImpl, ProductDatasourceImpl, ProductRepositoryImpl } from "../../infrastructure";



export class ProductService{
    private readonly productDatasource = new ProductDatasourceImpl(
            AppDataSource.getRepository(ProductModel)
    );
    private readonly productRepository = new ProductRepositoryImpl(this.productDatasource);
    

    private readonly categoryDatasource = new CategoryDatasourceImpl(
        AppDataSource.getRepository(CategoryModel)
    );
    private readonly categoryRepository = new CategoryRepositoryImpl(this.categoryDatasource);

    constructor(){
        
    }

    async getAll(){
        const products = new GetAllProductsUseCase(this.productRepository);
        return await products.execute();
    }

    async getById(id: string){
        const product = new GetProductIdUseCase(this.productRepository);
        return await product.execute(id);
    }

    async getByName(name: string){
        const product = new GetProductNameUseCase(this.productRepository);
        return await product.execute(name);
    }

    async create(dto: CreateProductDto){
        const create = new CreateProductUseCase(this.productRepository, this.categoryRepository);
        return await create.execute(dto);
    }

    async update(id: string, dto: UpdateProductDto){
        const update = new UpdateProductUseCase(this.productRepository, this.categoryRepository);
        return await update.execute(id,dto)
    }

    async able(id: string){
        const enable = new AbleProductUseCase(this.productRepository);
        return await enable.execute(id);
    }
    
    async disable(id: string){
        const disable = new DisableProductUseCase(this.productRepository);
        return await disable.execute(id);
    }



}