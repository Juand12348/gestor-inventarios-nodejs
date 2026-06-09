import { AppDataSource } from "../../data/data-source";
import { UserModel } from "../../data/models/user.model";
import {  AbleUserUseCase, DisableUserUseCase, GetUserEmailUseCase, GetUserIdUseCase, UpdateProductDto, UpdateUserUseCase } from "../../domain";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";



export class UserService{
    private readonly userDatasource = new UserDatasourceImpl(
            AppDataSource.getRepository(UserModel)
    );
    private readonly userRepository = new UserRepositoryImpl(this.userDatasource);
    

    constructor(){
        
    }


    async getById(id: string){
        const user = new GetUserIdUseCase(this.userRepository);
        return await user.execute(id);
    }

    async getByEmail(name: string){
        const user = new GetUserEmailUseCase(this.userRepository);
        return await user.execute(name);
    }

    

    async update(id: string, dto: UpdateProductDto){
        const update = new UpdateUserUseCase(this.userRepository);
        return await update.execute(id,dto)
    }

    async able(id: string){
        const enable = new AbleUserUseCase(this.userRepository);
        return await enable.execute(id);
    }
    
    async disable(id: string){
        const disable = new DisableUserUseCase(this.userRepository);
        return await disable.execute(id);
    }



}