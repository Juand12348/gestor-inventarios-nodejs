import { MovementRepository } from "../../repositories";


export class GetAllMovementsUseCase{

    constructor(
        private readonly repository: MovementRepository
    ){}

    async execute(){

        return this.repository.getAll();

    }

}