import { UserEntity } from "../../entities/user.entity";


export abstract class AuthUserRepository{

    abstract registerUser(userRegister: UserEntity):Promise<UserEntity | null>;
}