import { getUUID } from "../../../config";
import { CreateProductDto } from "../../dtos";
import { ProductEntity } from "../../entities/product.entity";
import { CustomError } from "../../errors/custom.error";
import { CategoryRepository, ProductRepository} from "../../repositories";

export class CreateProductUseCase{

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository,
    ){}

    async execute(dto: CreateProductDto):Promise<ProductEntity>{
        
        const { name, description, price, stock, available,categoryId } = dto;

        const productExists = await this.productRepository.getName(name);
        if(productExists) throw CustomError.badRequest('Product already exists');

        const category = await this.categoryRepository.getById(categoryId);
        if(!category) throw CustomError.notFound('Category not exists');


        const id = getUUID();

        const product = new ProductEntity({id, name, description, price, stock, available, categoryId} );

        const createdProduct = await this.productRepository.create(product);
        


        return createdProduct;


    }






}