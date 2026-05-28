import { MovementType } from "../../entities/movement.entity";
import { MovementRepository } from "../../repositories";


export class GetMovementsTypeUseCase{

    constructor(
        private readonly repository: MovementRepository
    ){}

    async execute(type: MovementType){

        return await this.repository.getByType(type);

    }


}