import { ForgotPasswordDto } from "../../dtos/auth/forgot-password.dto";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories";




export class ForgotPasswordUseCase{

    constructor(
        private readonly repository: UserRepository,
    ){}

    async execute(dto: ForgotPasswordDto){

        const {email} = dto;

        const user = await this.repository.getByEmail(email);
        if(!user) throw CustomError.notFound('User not exist');

        return user;

    }

}