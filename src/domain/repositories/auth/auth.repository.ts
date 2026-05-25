import { LoginUserDto, RegisterUserDto } from "../../dtos";
import { UserEntity } from "../../entities/user.entity";


export abstract class AuthUserRepository{

    abstract loginUser(loginUserDto: LoginUserDto):Promise<UserEntity>;
    abstract registerUser(registerUserDto: RegisterUserDto):Promise<UserEntity>;
    abstract validateEmail(token: string):Promise<boolean>;
}