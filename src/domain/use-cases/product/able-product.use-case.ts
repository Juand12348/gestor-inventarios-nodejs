import { CustomError } from "../../errors/custom.error";
import { ProductRepository } from "../../repositories";



export class AbleProductUseCase{

    constructor(
        private readonly repository: ProductRepository
    ){}


    async execute(id: string){

        const product = await this.repository.getById(id);
        if(!product) throw CustomError.notFound('Product not exists');

        if(product.availableValue) throw CustomError.badRequest('Product already able');

        product.availableValue = true;

        const disabled = await this.repository.update(id, product);

        return disabled;


    }


}