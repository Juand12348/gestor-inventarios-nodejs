import { UpdateUserDto } from "../../dtos/user/update-user.dto";
import { UserEntity } from "../../entities/user.entity";


export abstract class UserDatasource{

    abstract getUserById(id: string):Promise<UserEntity | null>;
    abstract getUserByEmail(email: string):Promise<UserEntity | null>;
    abstract updateUser(id: string,updateUserDto: UpdateUserDto):Promise<UserEntity>;
    abstract deleteUser(id: string):Promise<boolean>;

}