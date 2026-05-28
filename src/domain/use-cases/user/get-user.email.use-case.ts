import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories";


export class GetUserNameUseCase{

    constructor(
        private readonly repository: UserRepository
    ){}

    async execute(email: string){

        const user = await this.repository.getByEmail(email);
        if(!user) throw CustomError.notFound(`User with email: ${email} not found`);

        return user;

    }

}