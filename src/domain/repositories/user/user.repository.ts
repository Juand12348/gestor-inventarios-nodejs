import { UpdateUserDto } from "../../dtos";
import { UserEntity } from "../../entities/user.entity";


export abstract class UserRepository{

    abstract getUserById(id: string):Promise<UserEntity | null>;
    abstract getUserByEmail(email: string):Promise<UserEntity | null>;
    abstract updateUser(id: string,updateUserDto: UpdateUserDto):Promise<UserEntity>;
    abstract updateUser(id: string):Promise<boolean>;

}