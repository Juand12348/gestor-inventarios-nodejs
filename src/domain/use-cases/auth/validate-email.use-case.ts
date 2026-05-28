import { JwtAdapter } from "../../../config";
import { CustomError } from "../../errors/custom.error";
import { AuthUserRepository, UserRepository } from "../../repositories";


export class validateEmailUseCase{


    constructor(
        private readonly userRepository: UserRepository
    ){}


    async execute(token: string){

        const payload = await JwtAdapter.validatedToken(token);
        if(!payload ) throw CustomError.unauthorized('Invalid token');

        const payloadData = payload as {email: string};
        if(!payloadData.email) throw CustomError.internalServer('Email not in token');

        const user = await this.userRepository.getByEmail(payloadData.email);
        if(!user) throw CustomError.notFound('Email not exists');

        user.emailValidatedValue = true;
        user.availableValue = true;

        return await this.userRepository.update(user.idValue ,user);

    }

}