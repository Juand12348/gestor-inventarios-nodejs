import { bcryptAdapter } from "../../../config";
import { ResetPasswordDto } from "../../dtos/auth/reset-password.dto";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories";


export class ResetPasswordUseCase{

    constructor(private readonly repository: UserRepository){}

    async execute(email: string,dto: ResetPasswordDto){

        const {password} = dto;

        const user = await this.repository.getByEmail(email);
        if(!user) throw CustomError.notFound('User not found');

        user.passwordValue = bcryptAdapter.hash(password);

        const updated = await this.repository.update(user.idValue,user);
         return updated;

    }

}