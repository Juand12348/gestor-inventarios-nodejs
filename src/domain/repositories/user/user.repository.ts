import { UserEntity } from "../../entities/user.entity";


export abstract class UserRepository{

    abstract getById(id: string):Promise<UserEntity>;
    abstract getByEmail(email: string):Promise<UserEntity>;
    abstract update(id: string,user: UserEntity):Promise<UserEntity>;

}