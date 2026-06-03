import { UserDatasource, UserEntity, UserRepository } from "../../../domain";



export class UserRepositoryImpl implements UserRepository{

    constructor(private readonly datasource: UserDatasource){}

    getById(id: string): Promise<UserEntity | null> {
        return this.datasource.getById(id);
    }
    getByEmail(email: string): Promise<UserEntity | null> {
        return this.datasource.getByEmail(email);
    }
    update(id: string, user: UserEntity): Promise<UserEntity | null> {
        return this.datasource.update(id, user);
    }

}