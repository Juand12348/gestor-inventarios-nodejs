import { AppDataSource } from "../../../data/data-source";
import { UserModel } from "../../../data/models/user.model";
import { AuthUserDatasource, UserEntity } from "../../../domain";



export class AuthUserDatasourceImpl implements AuthUserDatasource{
    private readonly repository = AppDataSource.getRepository(UserModel);
    
    async registerUser(userRegister: UserEntity): Promise<UserEntity | null> {
        const model = await this.repository.create({
            id: userRegister.idValue,
            name: userRegister.nameValue,
            email: userRegister.emailValue,
            password: userRegister.passwordValue,
            emailValidated: userRegister.emailValidatedValue,
            role: userRegister.roleValue,
            available: userRegister.availableValue

        });

        const saved = await this.repository.save(model);

        return UserEntity.fromObject(saved);
    }

}