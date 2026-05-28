import { ProductEntity } from "../../entities/product.entity";

export abstract class ProductDatasource {

    abstract getById(id: string): Promise<ProductEntity>;

    abstract getAll(): Promise<ProductEntity[]>;

    abstract getName(name: string):Promise<ProductEntity>;

    abstract create(product: ProductEntity): Promise<ProductEntity>;

    abstract update(id: string,product: ProductEntity): Promise<ProductEntity>;


}