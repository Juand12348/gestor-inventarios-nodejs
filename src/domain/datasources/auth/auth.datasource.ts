import { UserEntity } from "../../entities/user.entity";


export abstract class AuthUserDatasource{

    abstract registerUser(userRegister: UserEntity):Promise<UserEntity>;
}