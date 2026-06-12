import { CustomError } from "../../errors/custom.error";
import { MovementRepository, ProductRepository } from "../../repositories";


export class GetMovementProductIdUseCase{

    constructor(
        private readonly movementRepository: MovementRepository,
        private readonly productRepository: ProductRepository,
    ){}


    async execute(productId: string){

        const product = await this.productRepository.getById(productId);
        if(!product) throw CustomError.notFound(`Product with id ${productId} not found`);

        const movements = await this.movementRepository.getByProductId(productId);

        return movements;

    }


}