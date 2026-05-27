import { CustomError } from "../../errors/custom.error";
import { ProductRepository } from "../../repositories";


export class GetProductIdUseCase{


    constructor(
        private readonly repository: ProductRepository
    ){}

    async execute(id: string){

    
        const product = await this.repository.getById(id);
        if(!product) throw CustomError.notFound(`Product with id ${id} not found`);
        

        return product;


    }

}