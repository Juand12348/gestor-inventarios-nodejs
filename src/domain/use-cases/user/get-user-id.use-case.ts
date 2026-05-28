import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories";


export class GetUserIdUseCase{

    constructor(
        private readonly repository: UserRepository
    ){}

    async execute(id: string){

        const user = await this.repository.getById(id);
        if(!user) throw CustomError.notFound(`User with id: ${id} not found`);

        return user;

    }

}