import { CustomError } from "../../errors/custom.error";
import { MovementRepository } from "../../repositories";


export class GetMovementIdUseCase{

    constructor(
        private readonly reposirtory: MovementRepository
    ){}

    async execute(id: string){

        const movement = await this.reposirtory.getById(id);
        if(!movement) throw CustomError.notFound(`Movement with id: ${id} not found`);

        return movement;
    }

    


}