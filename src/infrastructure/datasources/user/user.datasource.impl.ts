import { AppDataSource } from "../../../data/data-source";
import { UserModel } from "../../../data/models/user.model";
import { UserDatasource, UserEntity } from "../../../domain";


export class UserDatasourceImpl implements UserDatasource{
    private readonly repository = AppDataSource.getRepository(UserModel);

    async getById(id: string): Promise<UserEntity | null> {
        const user = await this.repository.findOne({
            where:{
                id
            }
        });

        if(!user) return null;

        return UserEntity.fromObject(user);
    }
    
    async getByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.repository.findOne({
            where: {
                email
            }
        });

        if(!user) return null;

        return UserEntity.fromObject(user);
    }
    
    async update(id: string, user: UserEntity): Promise<UserEntity | null> {
        const model = await this.repository.findOne({
            where: {id}
        });

        if(!model) return null;

        model.name = user.nameValue;
        model.email = user.emailValue;
        model.password = user.passwordValue;
        model.emailValidated = user.emailValidatedValue;
        model.role = user.roleValue;
        model.available = user.availableValue;

        const updated = await this.repository.save(model);

        return UserEntity.fromObject(updated);
    }

}