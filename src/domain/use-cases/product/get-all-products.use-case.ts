import { CustomError } from "../../errors/custom.error";
import { ProductRepository } from "../../repositories";



export class GetAllProductsUseCase{

    constructor(
        private readonly repository: ProductRepository
    ){

    }

    async execute(){

        const products = await this.repository.getAll();

        return products;

    }


}