import { UserEntity } from "../../entities/user.entity";


export abstract class UserRepository{

    abstract getById(id: string):Promise<UserEntity | null>;
    abstract getByEmail(email: string):Promise<UserEntity | null>;
    abstract update(id: string,user: UserEntity):Promise<UserEntity>;
    abstract delete(id: string):Promise<boolean>;

}