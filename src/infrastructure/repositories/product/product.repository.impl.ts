import { ProductDatasource, ProductEntity, ProductRepository } from "../../../domain";



export class ProductRepositoryImpl implements ProductRepository{
    
    constructor(private readonly datasource: ProductDatasource){}

    getById(id: string): Promise<ProductEntity | null> {
        return this.datasource.getById(id);
    }
    getAll(): Promise<ProductEntity[]> {
        return this.datasource.getAll();
    }
    getName(name: string): Promise<ProductEntity | null> {
        return this.datasource.getName(name);
    }
    create(product: ProductEntity): Promise<ProductEntity | null> {
        return this.datasource.create(product);
    }
    update(id: string, product: ProductEntity): Promise<ProductEntity | null> {
        return this.datasource.update(id, product);
    }

}