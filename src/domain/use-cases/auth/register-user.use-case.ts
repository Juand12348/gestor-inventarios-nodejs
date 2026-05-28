import { bcryptAdapter, getUUID} from "../../../config";
import { RegisterUserDto } from "../../dtos";
import { UserEntity, UserRole } from "../../entities/user.entity";
import { CustomError } from "../../errors/custom.error";
import { AuthUserRepository, UserRepository } from "../../repositories";




export class RegisterUserUseCase{


    constructor(
        private readonly authRepository: AuthUserRepository,
        private readonly userRepository: UserRepository
    ){}


    async execute(dto: RegisterUserDto){

        const { name, email, password } = dto;

        const userExists = await this.userRepository.getByEmail(email);
        if(userExists) throw CustomError.badRequest('User already exists');

        
        const id = getUUID();
        const role = UserRole.EMPLOYED;
        const emailValidated = false;
        const available = false;
        const user = new UserEntity({id,name, email, password, emailValidated, role,available});

            // Encriptar constraseña
        user.passwordValue = bcryptAdapter.hash(password);

        const register = await this.authRepository.registerUser(user);

        return register;

    }

}