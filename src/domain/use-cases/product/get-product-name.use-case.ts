import { CustomError } from "../../errors/custom.error";
import { ProductRepository } from "../../repositories";


export class GetProductNameUseCase{


    constructor(
        private readonly repository: ProductRepository
    ){}

    async execute(name: string){

    
        const product = await this.repository.getName(name);
        if(!product) throw CustomError.notFound(`Product with name ${name} not found`);
        

        return product;


    }

}