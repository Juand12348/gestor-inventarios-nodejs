import { getUUID } from "../../../config";
import { CreateMovementDto } from "../../dtos";
import { MovementEntity, MovementType } from "../../entities/movement.entity";
import { CustomError } from "../../errors/custom.error";
import { MovementRepository, ProductRepository } from "../../repositories";


export class CreateMovementUseCase{

    constructor (
        private readonly movementRepository: MovementRepository,
        private readonly productRepository: ProductRepository,
    ){}

    async execute(dto: CreateMovementDto){

        const { productId, type, quantity} = dto;

        const product = await this.productRepository.getById(productId);
        if(!product) throw CustomError.notFound(`Product with id: ${productId} not found`);

        const id = getUUID();
        const movement = new MovementEntity({id, productId, type, quantity});

        switch(type){
            case MovementType.PURCHASE:
            case MovementType.RETURN:
                product.stockValue = product.stockValue + quantity;
                break;
            case MovementType.SALE:
            case MovementType.LOSS:
                const stock = product.stockValue;
                if((stock - quantity) < 0){
                    throw CustomError.badRequest('Insufficient stock')
                }
                product.stockValue = product.stockValue - quantity;
                break;
            default:
                throw CustomError.internalServer('Internal server error');
        }

        await this.productRepository.update(productId,product);

        const created = await this.movementRepository.create(movement);

        return created;
    }


}