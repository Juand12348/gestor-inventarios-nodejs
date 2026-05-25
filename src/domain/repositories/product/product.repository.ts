import { CreateProductDto, UpdateProductDto } from "../../dtos";
import { ProductEntity } from "../../entities/product.entity";


export abstract class ProductRepository{

    abstract getProductById(id: string):Promise<ProductEntity | null>;
    abstract getAllProduct(email: string):Promise<ProductEntity[] | null>;
    abstract createProduct(createProductDto: CreateProductDto):Promise<ProductEntity | null>
    abstract updateProduct(id: string,updateProductDto: UpdateProductDto):Promise<ProductEntity | null>;
    abstract deleteProduct(id: string):Promise<boolean>;

}