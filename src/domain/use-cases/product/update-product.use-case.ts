import { UpdateProductDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";
import { CategoryRepository, ProductRepository } from "../../repositories";


export class UpdateProductUseCase{


    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository,
    ){}


    async execute(id: string,dto: UpdateProductDto){

        const { name, description, price, stock, available,categoryId} = dto;

        const product = await this.productRepository.getById(id);
        if(!product) throw CustomError.notFound('Product not found');

        if(name) product.nameValue = name;
        if(description) product.descriptionValue = description;
        if(price !== undefined) product.priceValue = price;
        if(stock !== undefined) product.stockValue = stock;
        if(available !== undefined) product.availableValue = available;
        if(categoryId){
            const category = await this.categoryRepository.getById(categoryId);
            if(!category) throw CustomError.notFound('Category not exists')
            product.categoryIdValue = categoryId;
        }
        
        const updatedProduct = await this.productRepository.update(id, product); 


        return updatedProduct;
    }

}
