import { ProductEntity } from "../../entities/product.entity";

export abstract class ProductDatasource {

    abstract getById(id: string): Promise<ProductEntity | null>;

    abstract getAll(): Promise<ProductEntity[]>;

    abstract getName(name: string):Promise<ProductEntity | null>;

    abstract create(product: ProductEntity): Promise<ProductEntity | null>;

    abstract update(id: string,product: ProductEntity): Promise<ProductEntity | null>;


}