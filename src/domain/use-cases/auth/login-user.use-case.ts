import { bcryptAdapter, JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories";



export class LoginUserUseCase{

    constructor(
        private readonly userRepository: UserRepository,
    ){}

    async execute(dto: LoginUserDto){

        const {email, password} = dto;

        const user = await this.userRepository.getByEmail(email);
        if(!user) throw CustomError.badRequest(`Invalid credentials`);

        const hasMatch = bcryptAdapter.compare(password, user.passwordValue);
        if(!hasMatch) throw CustomError.badRequest('Invalid credentials');

        const token = await JwtAdapter.generateToken({id: user.idValue});
        if(!token) throw CustomError.internalServer('Error while creating JWT');

        return {
            user, token
        };


    }


}