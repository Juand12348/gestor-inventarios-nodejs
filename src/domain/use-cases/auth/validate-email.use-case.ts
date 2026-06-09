import { JwtAdapter } from "../../../config";
import { CustomError } from "../../errors/custom.error";
import { AuthUserRepository, UserRepository } from "../../repositories";


export class validateEmailUseCase{


    constructor(
        private readonly userRepository: UserRepository
    ){}


    async execute(email: string){

        const user = await this.userRepository.getByEmail(email);
        if(!user) throw CustomError.notFound('Email not exists');

        user.emailValidatedValue = true;
        user.availableValue = true;

        return await this.userRepository.update(user.idValue ,user);

    }

}