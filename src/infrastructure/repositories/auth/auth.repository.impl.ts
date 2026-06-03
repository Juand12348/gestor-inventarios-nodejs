import { AuthUserDatasource, AuthUserRepository, UserEntity } from "../../../domain";

export class AuthUserRepositoryImpl implements AuthUserRepository{
    
    constructor(private readonly datasource: AuthUserDatasource){}
    
    registerUser(userRegister: UserEntity): Promise<UserEntity | null> {
        return this.datasource.registerUser(userRegister);
    }

}