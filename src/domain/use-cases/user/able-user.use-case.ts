import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories";


export class AbleUserUseCase{

    constructor(
        private readonly reapository: UserRepository
    ){}

    async execute(id: string){

        const user = await this.reapository.getById(id);
        if(!user) throw CustomError.notFound(`User with id: ${id} not found`);

        if(user.availableValue === true){
            throw CustomError.badRequest('User already able');
        }

        user.availableValue = true;

        return this.reapository.update(id, user);
    
    }

}