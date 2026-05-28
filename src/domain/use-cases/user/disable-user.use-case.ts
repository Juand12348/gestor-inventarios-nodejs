import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories";


export class DisableUserUseCase{

    constructor(
        private readonly reapository: UserRepository
    ){}

    async execute(id: string){

        const user = await this.reapository.getById(id);
        if(!user) throw CustomError.notFound(`User with id: ${id} not found`);

        if(user.availableValue === false){
            throw CustomError.badRequest('User already disable');
        }

        user.availableValue = false;

        return this.reapository.update(id, user);
    
    }

}